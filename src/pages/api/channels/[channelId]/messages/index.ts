import type {APIRoute} from "astro";
import {newAppContainer} from "@backend/backend";
import {HttpResponse} from "@backend/infrastructure/http/http-response";
import type {ErrorView} from "@backend/package/view/error.view";
import {z} from "zod";

const ParamsDataSchema = z.object({
  channelId: z
    .string()
    .regex(/[a-zA-Z0-9]/)
    .min(1),
});

export const CreateMessageSchema = z.object({
  content: z.string().min(1),
});

export const POST: APIRoute = async (ctx) => {
  try {
    const appContainer = newAppContainer();
    const userSession = appContainer.getUserSession(ctx.cookies);
    const actingUser = await userSession.GetUserFromSession();

    if (actingUser.isEmpty()) {
      return HttpResponse.json<ErrorView>(
        {message: "Unauthorized"},
        {status: 401}
      );
    }

    const {channelId} = ParamsDataSchema.parse(ctx.params);
    const payload = await ctx.request.json();
    const {content} = CreateMessageSchema.parse(payload);

    return appContainer.getMessageController().handleCreateMessage({
      userId: actingUser.get().id,
      channelId,
      content,
    });
  } catch (e) {
    console.error(e);
    return new Response(null, {status: 500});
  }
};
