import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    // Check environment variables - use SUPABASE_URL which matches the SUPABASE_ANON_KEY
    const projectUrl = process.env.SUPABASE_URL
    const anonKey = process.env.SUPABASE_ANON_KEY

    if (!projectUrl || !anonKey) {
      console.error('[v0] Missing Supabase env vars:', { projectUrl: !!projectUrl, anonKey: !!anonKey })
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      )
    }

    const supabase = createClient(projectUrl, anonKey)

    const body = await req.json()
    const { email, suggestion } = body

    if (!email?.trim() || !suggestion?.trim()) {
      return NextResponse.json({ error: 'Email and suggestion are required.' }, { status: 400 })
    }

    // Insert suggestion into the suggestions table
    const { error: insertError } = await supabase
      .from('suggestions')
      .insert({
        email: email.toLowerCase().trim(),
        suggestion: suggestion.trim(),
      })

    if (insertError) {
      console.error('[v0] Error inserting suggestion:', insertError)
      throw insertError
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your suggestion!',
    })
  } catch (err) {
    console.error('[v0] Suggestion submission error:', err)
    return NextResponse.json(
      { error: 'Failed to submit suggestion.' },
      { status: 500 }
    )
  }
}
