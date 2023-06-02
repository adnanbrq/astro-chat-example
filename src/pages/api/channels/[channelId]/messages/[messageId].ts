import type { APIRoute } from "astro";
import { newAppContainer } from "@backend/backend";
import { HttpResponse } from "@backend/infrastructure/http/http-response";
import type { ErrorView } from "@backend/package/view/error.view";
import { z } from "zod";

const ParamsDataSchema = z.object({
  channelId: z
    .string()
    .regex(/[a-zA-Z0-9]/)
    .min(1),
  messageId: z.string().regex(/[0-9]/).min(1).transform(Number),
});

export const get: APIRoute = async (ctx) => {
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

    const params = ParamsDataSchema.safeParse(ctx.params);
    if (!params.success) {
      return HttpResponse.json<ErrorView>(
        { message: "Invalid Body" },
        { status: 403 }
      );
    }

    const { channelId, messageId } = params.data;
    return appContainer
      .getMessageController()
      .handleGetMessage(channelId, messageId);
  } catch (e) {
    return new Response(null, { status: 500 });
  }
};
