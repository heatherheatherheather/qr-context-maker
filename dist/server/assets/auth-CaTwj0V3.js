import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { s as supabase } from "./client-9_o7IXC9.js";
import { c as cn, C as Card, L as Label, I as Input, B as Button } from "./card-BMnGiDfI.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-e8YzuJ2R.js";
import { z } from "zod";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const SignUpSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  accessCode: z.string().min(1).max(32)
});
const signUpWithAccessCode = createServerFn({
  method: "POST"
}).inputValidator((input) => SignUpSchema.parse(input)).handler(createSsrRpc("11b74f58f147f7b0613f3859a09178a103d4186be738cd42c1d1a40782e7a91f"));
function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/",
        replace: true
      });
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({
        to: "/",
        replace: true
      });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(QrCode, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-2xl font-bold tracking-tight", children: "🦄 Cabana's Cute Cue-Are Code Console" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sign in to manage your QR codes." })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "signin", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "signin", children: "Sign in" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", children: "Sign up" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "signin", className: "mt-4", children: /* @__PURE__ */ jsx(SignInForm, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "signup", className: "mt-4", children: /* @__PURE__ */ jsx(SignUpForm, {}) })
    ] }) })
  ] }) });
}
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setPending(false);
    if (error) toast.error(error.message);
    else toast.success("Signed in");
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "signin-email", children: "Email" }),
      /* @__PURE__ */ jsx(Input, { id: "signin-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "signin-password", children: "Password" }),
      /* @__PURE__ */ jsx(Input, { id: "signin-password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value) })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: pending, children: pending ? "Signing in…" : "Sign in" })
  ] });
}
function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [pending, setPending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      await signUpWithAccessCode({
        data: {
          email: email.trim(),
          password,
          accessCode: accessCode.trim()
        }
      });
      const {
        error: signInError
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (signInError) throw signInError;
      toast.success("Account created");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      toast.error(message);
    } finally {
      setPending(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "signup-email", children: "Email" }),
      /* @__PURE__ */ jsx(Input, { id: "signup-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "signup-password", children: "Password" }),
      /* @__PURE__ */ jsx(Input, { id: "signup-password", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "At least 6 characters" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "signup-access-code", children: "Access code" }),
      /* @__PURE__ */ jsx(Input, { id: "signup-access-code", type: "text", required: true, value: accessCode, onChange: (e) => setAccessCode(e.target.value), placeholder: "Required to sign up", autoComplete: "off", inputMode: "numeric" })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: pending, children: pending ? "Creating account…" : "Create account" })
  ] });
}
export {
  AuthPage as component
};
