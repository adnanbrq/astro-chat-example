import type { SelectChannelEntity } from "../../database/entity/channel.entity";
import type { SelectMessageEntity } from "../../database/entity/message.entity";

type MessageID = SelectMessageEntity["id"];
type ChannelID = SelectChannelEntity["id"];

export interface MessageController {
  handleGetMessage(
    channelId: ChannelID,
    messageId: MessageID
  ): Promise<Response>;
  handleCreateMessage(
    props: Pick<SelectMessageEntity, "channelId" | "userId" | "content">
  ): Promise<Response>;
}
