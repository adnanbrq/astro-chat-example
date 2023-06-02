import type { Generated } from "kysely";

export type Entity<T, E> = E & {
  id: Generated<T>;
  createdAt: Date;
  updatedAt: Date;
};

export type Insertable<T> = Omit<T, "id">;
