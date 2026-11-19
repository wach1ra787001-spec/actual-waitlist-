-- Create suggestions table
CREATE TABLE IF NOT EXISTS public.suggestions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_suggestions_email ON public.suggestions(email);

-- Add comment
COMMENT ON TABLE public.suggestions IS 'User feature suggestions';
