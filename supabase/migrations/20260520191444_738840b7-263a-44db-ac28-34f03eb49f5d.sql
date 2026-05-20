DROP POLICY IF EXISTS "Public read" ON public.qr_codes;
DROP POLICY IF EXISTS "Public insert" ON public.qr_codes;
DROP POLICY IF EXISTS "Public update" ON public.qr_codes;
DROP POLICY IF EXISTS "Public delete" ON public.qr_codes;

CREATE POLICY "Authenticated read" ON public.qr_codes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert" ON public.qr_codes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.qr_codes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete" ON public.qr_codes FOR DELETE TO authenticated USING (true);

-- Allow public (anon) to call increment_scan so QR scans work without login
GRANT EXECUTE ON FUNCTION public.increment_scan(text) TO anon, authenticated;