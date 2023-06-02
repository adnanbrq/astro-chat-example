import type { ChannelView } from "@backend/package/view/channel.view";
import type { SelectChannelEntity } from "../../database/entity/channel.entity";

type ChannelID = SelectChannelEntity["id"];

export interface ChannelController {
  handleGetChannel(channelId: ChannelID): Promise<Response>;
  handleCreateChannel(props: Pick<ChannelView, "name">): Promise<Response>;
}
