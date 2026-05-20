import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "authed">("checking");

  useEffect(() => {
    let active = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!active) return;
      if (!session) {
        navigate({ to: "/auth", replace: true });
      } else {
        setStatus("authed");
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
      } else {
        setStatus("authed");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  return <Outlet />;
}
