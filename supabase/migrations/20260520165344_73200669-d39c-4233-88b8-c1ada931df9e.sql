
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$;

CREATE OR REPLACE FUNCTION public.increment_scan(p_short_code TEXT)
RETURNS TABLE(url TEXT) LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  RETURN QUERY
  UPDATE public.qr_codes
  SET scan_count = scan_count + 1,
      last_scanned_at = now()
  WHERE short_code = p_short_code
  RETURNING qr_codes.url;
END; $$;
