import type { ColumnType, Generated, Insertable, Selectable } from "kysely";

export type SelectUserEntity = Selectable<UserEntity>;
export type InsertUserEntity = Insertable<UserEntity>;
export type UserEntity = {
  id: Generated<string>;
  name: string;
  email: string;
  password: string;
};
