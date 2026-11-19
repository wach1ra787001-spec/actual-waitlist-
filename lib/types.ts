export interface WaitlistFormData {
  // Step 1 — Personal
  full_name: string
  preferred_name: string
  // Step 2 — Contact
  email: string
  phone_number: string
  // Step 3 — Trading
  trading_experience: string
  trading_platform: string
  custom_platform: string
  markets: string[]
  // Step 4 — Journaling
  does_journal: boolean | null
  journal_duration: string
  journaling_goal: string
  // Step 5 — Discovery
  heard_about_us: string
}

export const INITIAL_FORM_DATA: WaitlistFormData = {
  full_name: '',
  preferred_name: '',
  email: '',
  phone_number: '',
  trading_experience: '',
  trading_platform: '',
  custom_platform: '',
  markets: [],
  does_journal: null,
  journal_duration: '',
  journaling_goal: '',
  heard_about_us: '',
}

export const TRADING_EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner (< 1 year)' },
  { value: 'intermediate', label: 'Intermediate (1–3 years)' },
  { value: 'advanced', label: 'Advanced (3–5 years)' },
  { value: 'expert', label: 'Expert (5+ years)' },
]

export const TRADING_PLATFORMS = [
  'TradingView', 'MT5', 'Interactive Brokers', 'Webull',
  'TD Ameritrade', 'MT4', 'Robinhood', 'Tastytrade', 'Other',
]

export const MARKETS = [
  'Stocks', 'Options', 'Futures', 'Forex', 'Crypto', 'Indices', 'Commodities',
]

export const JOURNALING_GOALS = [
  'Track my trades automatically',
  'Spot patterns in my wins & losses',
  'Improve discipline & consistency',
  'Generate detailed performance reports',
  'All of the above',
]

export const HEARD_ABOUT_OPTIONS = [
  'Twitter / X', 'YouTube', 'TikTok', 'Instagram', 'Discord',
  'Reddit', 'Friend / Referral', 'Google Search', 'Other',
]

export const TYPEWRITER_MESSAGES = [
  'Securing your founding spot...',
  'Validating your info...',
  'Adding you to the list...',
  'Almost there...',
  'Welcome aboard!',
]
