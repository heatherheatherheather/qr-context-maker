-- Add description column to qr_codes
ALTER TABLE public.qr_codes ADD COLUMN description TEXT NOT NULL DEFAULT ''::text;

-- Update the trigger for updated_at (already exists as set_updated_at)
-- No RLS changes needed — existing public policies cover the new column
