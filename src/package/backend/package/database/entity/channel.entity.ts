import type { ColumnType, Generated, Insertable, Selectable } from "kysely";

export type SelectChannelEntity = Selectable<ChannelEntity>;
export type InsertChannelEntity = Insertable<ChannelEntity>;
export type ChannelEntity = {
  id: Generated<string>;
  name: string;
  createdAt: ColumnType<Date, string, never>;
  updatedAt: ColumnType<Date, string, never>;
};
