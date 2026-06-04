import { jsx } from "react/jsx-runtime";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-9_o7IXC9.js";
import "@supabase/supabase-js";
function AuthGate() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");
  useEffect(() => {
    let active = true;
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!active) return;
      if (!session) {
        navigate({
          to: "/auth",
          replace: true
        });
      } else {
        setStatus("authed");
      }
    });
    supabase.auth.getSession().then(({
      data
    }) => {
      if (!active) return;
      if (!data.session) {
        navigate({
          to: "/auth",
          replace: true
        });
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
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center text-muted-foreground", children: "Loading…" });
  }
  return /* @__PURE__ */ jsx(Outlet, {});
}
export {
  AuthGate as component
};
