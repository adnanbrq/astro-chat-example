import { Kysely, PostgresDialect } from "kysely";
import PG from "pg";
import type { ChannelEntity } from "./entity/channel.entity";
import type { MessageEntity } from "./entity/message.entity";
import type { UserEntity } from "./entity/user.entity";

// Postgres types setup
PG.types.setTypeParser(20, (val) => parseInt(val, 10)); // int8
PG.types.setTypeParser(23, (val) => parseInt(val, 10)); // int4
PG.types.setTypeParser(700, (val) => parseFloat(val)); // float4
PG.types.setTypeParser(701, (val) => parseFloat(val)); // float8

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = import.meta.env;

export type KyselyInstance = Kysely<DatabaseStructure>;
export type DatabaseStructure = {
  User: UserEntity;
  Message: MessageEntity;
  Channel: ChannelEntity;
};

let _INSTANCE_: KyselyInstance | undefined;

export function newDB(): KyselyInstance {
  if (typeof _INSTANCE_ === "undefined") {
    _INSTANCE_ = new Kysely({
      dialect: new PostgresDialect({
        pool: new PG.Pool({
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          port: DB_PORT,
          ...(process.env.DB_SSL === "true"
            ? {
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : { ssl: false }),
        }),
      }),
    });
  }

  return _INSTANCE_;
}
