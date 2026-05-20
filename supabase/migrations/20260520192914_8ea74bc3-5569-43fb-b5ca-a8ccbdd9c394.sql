CREATE OR REPLACE FUNCTION public.increment_scan(p_short_code text)
RETURNS TABLE(url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  UPDATE public.qr_codes
  SET scan_count = scan_count + 1,
      last_scanned_at = now()
  WHERE short_code = p_short_code
  RETURNING qr_codes.url;
END; $function$;

GRANT EXECUTE ON FUNCTION public.increment_scan(text) TO anon, authenticated;