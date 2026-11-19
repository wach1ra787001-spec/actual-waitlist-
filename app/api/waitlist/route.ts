import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import type { WaitlistFormData } from '@/lib/types'

// Use the user's actual Supabase project (not the integration's auto-provisioned one)
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL!,
  process.env.SUPABASE_PROJECT_SERVICE_KEY!
)

// Resend email client
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body: WaitlistFormData = await req.json()

    // Basic validation
    if (!body.full_name?.trim() || !body.email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Check for duplicate email
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .ilike('email', body.email.trim())
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist.', code: 'DUPLICATE' },
        { status: 409 }
      )
    }

    // Insert
    const platformValue = body.trading_platform === 'Other' 
      ? body.custom_platform?.trim() || 'Other'
      : body.trading_platform

    // Map trading experience strings to integers - with debug log
    const experienceMap: { [key: string]: number } = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'professional': 4,
    }
    const expKey = body.trading_experience?.toLowerCase() || ''
    const tradingExperienceInt = experienceMap[expKey] ?? 1
    
    console.log('[v0] Trading experience raw:', body.trading_experience, 'mapped to:', tradingExperienceInt)

    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        full_name: body.full_name.trim(),
        preferred_name: body.preferred_name?.trim() || '',
        email: body.email.trim().toLowerCase(),
        phone_number: body.phone_number?.trim() || null,
        trading_experience: tradingExperienceInt,
        trading_platform: platformValue || null,
        custom_platform: body.custom_platform?.trim() || null,
        markets: body.markets?.length ? body.markets : [],
        does_journal: body.does_journal ?? false,
        journal_duration: body.journal_duration || null,
        journaling_goal: body.journaling_goal?.trim() ? [body.journaling_goal.trim()] : ['Not specified'],
        heard_about_us: body.heard_about_us || null,
      })
      .select('id')
      .single()

    if (error) throw error

    // Get position on waitlist
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    // Send confirmation email
    try {
      const userName = body.preferred_name || body.full_name.split(' ')[0]
      await resend.emails.send({
        from: 'JNV Trading Journal <hello@jnvtradingjournal.com>',
        to: body.email.trim().toLowerCase(),
        subject: "You're on the list — JNV Trading Journal",
        text: `Hi ${userName},

You're officially on the JNV Trading Journal waitlist.

Most traders collect screenshots, random notes, and scattered statistics. The result is inconsistent data and slower improvement.

JNV Trading Journal was built to solve that problem.

You'll be among the first traders to get access when we launch.

What to expect:

• Detailed trade analytics
• Strategy playbooks and models
• Performance tracking
• Psychology and discipline insights
• A clean trading workflow built for serious traders

We'll keep you updated as development progresses.

Thank you for joining.

— JNV Trading Journal`,
      })
    } catch (emailErr) {
      console.error('[waitlist] Email send failed:', emailErr)
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({
      success: true,
      position: count ?? 1,
      id: data.id,
    })
  } catch (err) {
    console.error('[waitlist] Error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
