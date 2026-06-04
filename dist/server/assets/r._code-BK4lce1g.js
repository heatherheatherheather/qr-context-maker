import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-9_o7IXC9.js";
import { R as Route } from "./router-CYAB-MCo.js";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
function RedirectPage() {
  const {
    code
  } = Route.useParams();
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      const {
        data,
        error: error2
      } = await supabase.rpc("increment_scan", {
        p_short_code: code
      });
      if (error2 || !data || data.length === 0) {
        setError("QR code not found");
        return;
      }
      const url = data[0].url;
      window.location.replace(url);
    })();
  }, [code]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-6", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: error ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-foreground", children: error }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "The link you scanned doesn't exist or has been deleted." })
  ] }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Redirecting…" }) }) });
}
export {
  RedirectPage as component
};
