import type { APIRoute } from "astro";
import { newAppContainer } from "@backend/backend";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { HttpResponse } from "@backend/infrastructure/http/http-response";

const SignInSchema = zfd.formData({
  email: z.string().email(),
  password: z.string().min(1),
});

const SignUpSchema = zfd.formData({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(1),
});

export const del: APIRoute = async (ctx) => {
  const container = newAppContainer();
  const userSession = container.getUserSession(ctx.cookies);

  userSession.RevokeSession();
  return HttpResponse.json(null, { status: 200 });
};

export const post: APIRoute = async (ctx) => {
  try {
    const controller = newAppContainer().getSessionController(
      ctx.cookies,
      ctx.redirect
    );
    const formData = await ctx.request.formData();

    if (formData.has("name")) {
      // Sign Up
      const data = SignUpSchema.parse(formData);
      return controller.handleSignUp(data.email, data.password, data.name);
    } else {
      // Sign In
      const data = SignInSchema.parse(formData);
      return controller.handleSignIn(data.email, data.password);
    }
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
};
