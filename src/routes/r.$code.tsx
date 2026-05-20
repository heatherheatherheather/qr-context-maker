import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/r/$code")({
  component: RedirectPage,
});

function RedirectPage() {
  const { code } = Route.useParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("increment_scan", { p_short_code: code });
      if (error || !data || data.length === 0) {
        setError("QR code not found");
        return;
      }
      const url = data[0].url;
      window.location.replace(url);
    })();
  }, [code]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-semibold text-foreground">{error}</h1>
            <p className="mt-2 text-muted-foreground">
              The link you scanned doesn't exist or has been deleted.
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">Redirecting…</p>
        )}
      </div>
    </div>
  );
}
