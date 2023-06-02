import type { ColumnType, Generated, Insertable, Selectable } from "kysely";
import type { SelectUserEntity } from "./user.entity";
import type { SelectChannelEntity } from "./channel.entity";

export type SelectMessageEntity = Selectable<MessageEntity>;
export type InsertMessageEntity = Insertable<MessageEntity>;
export type MessageEntity = {
  id: Generated<number>;
  content: string;
  createdAt: ColumnType<Date, string, never>;
  updatedAt: ColumnType<Date, string, never>;
  deletedAt?: ColumnType<Date, string | undefined, never>;

  // foreign keys
  userId: SelectUserEntity["id"];
  channelId: SelectChannelEntity["id"];
};
