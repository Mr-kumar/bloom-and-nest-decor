-- Add country field to addresses table
ALTER TABLE public.addresses ADD COLUMN country TEXT NOT NULL DEFAULT 'India';