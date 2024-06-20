import {Kysely, MysqlDialect} from "kysely";
import {createPool} from "mysql2";
import type {UserEntity} from "./entity/user.entity";
import type {MessageEntity} from "./entity/message.entity";
import type {ChannelEntity} from "./entity/channel.entity";

const {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} = import.meta.env;

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
      dialect: new MysqlDialect({
        pool: createPool({
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          port: DB_PORT ? parseInt(DB_PORT) : 3306,
        }),
      }),
    });
  }

  return _INSTANCE_;
}
