import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ACCESS_CODE = "320197";

const SignUpSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  accessCode: z.string().min(1).max(32),
});

export const signUpWithAccessCode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SignUpSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.accessCode.trim() !== ACCESS_CODE) {
      throw new Error("Invalid access code");
    }

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });
