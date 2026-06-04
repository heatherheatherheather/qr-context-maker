import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-e8YzuJ2R.js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const ACCESS_CODE = "320197";
const SignUpSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  accessCode: z.string().min(1).max(32)
});
const signUpWithAccessCode_createServerFn_handler = createServerRpc({
  id: "11b74f58f147f7b0613f3859a09178a103d4186be738cd42c1d1a40782e7a91f",
  name: "signUpWithAccessCode",
  filename: "src/lib/auth.functions.ts"
}, (opts) => signUpWithAccessCode.__executeServer(opts));
const signUpWithAccessCode = createServerFn({
  method: "POST"
}).inputValidator((input) => SignUpSchema.parse(input)).handler(signUpWithAccessCode_createServerFn_handler, async ({
  data
}) => {
  if (data.accessCode.trim() !== ACCESS_CODE) {
    throw new Error("Invalid access code");
  }
  const {
    error
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  signUpWithAccessCode_createServerFn_handler
};
