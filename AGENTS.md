# Architecture
- Generate all QR previews and downloads through `src/lib/qr-render.ts` so color, quiet zones, error correction, and logo placement stay consistent.
- Persist optional QR logo selection on the QR record; default off to preserve existing records.