
CREATE TABLE public.qr_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  scan_count INTEGER NOT NULL DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_qr_codes_short_code ON public.qr_codes(short_code);
CREATE INDEX idx_qr_codes_created_at ON public.qr_codes(created_at DESC);

ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.qr_codes FOR SELECT USING (true);
CREATE POLICY "Public insert" ON public.qr_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON public.qr_codes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete" ON public.qr_codes FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$;

CREATE TRIGGER qr_codes_updated_at
BEFORE UPDATE ON public.qr_codes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.increment_scan(p_short_code TEXT)
RETURNS TABLE(url TEXT) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN QUERY
  UPDATE public.qr_codes
  SET scan_count = scan_count + 1,
      last_scanned_at = now()
  WHERE short_code = p_short_code
  RETURNING qr_codes.url;
END; $$;
