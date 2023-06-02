import { newAppContainer } from "@backend/backend";
import { HttpResponse } from "@backend/infrastructure/http/http-response";
import type { ErrorView } from "@backend/package/view/error.view";
import type { APIRoute } from "astro";
import { z } from "zod";

export const CreateChannelSchema = z.object({
  name: z.string().min(1),
});

export const post: APIRoute = async (ctx) => {
  try {
    const appContainer = newAppContainer();
    const userSession = appContainer.getUserSession(ctx.cookies);
    const actingUser = await userSession.GetUserFromSession();

    if (actingUser.isEmpty()) {
      return HttpResponse.json<ErrorView>(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await ctx.request.json();
    const { name } = CreateChannelSchema.parse(payload);
    return appContainer.getChannelController().handleCreateChannel({ name });
  } catch (e) {
    return new Response(null, { status: 500 });
  }
};
