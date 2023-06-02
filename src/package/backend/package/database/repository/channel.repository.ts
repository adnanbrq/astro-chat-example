import { Optional } from "typescript-optional";
import type { KyselyInstance } from "../database";
import type {
  ChannelEntity,
  SelectChannelEntity,
} from "../entity/channel.entity";
import type { Insertable } from "kysely";

export interface ChannelRepository {
  findChannels(): Promise<SelectChannelEntity[]>;
  findChannelById(
    id: SelectChannelEntity["id"]
  ): Promise<Optional<SelectChannelEntity>>;
  persistChannel(
    channel: Insertable<ChannelEntity>
  ): Promise<Optional<SelectChannelEntity>>;
}

type Props = {
  DB: KyselyInstance;
};

export function newChannelRepository({ DB }: Props): ChannelRepository {
  return {
    async findChannelById(id) {
      try {
        const result = await DB.selectFrom("Channel")
          .selectAll()
          .where("Channel.id", "=", id)
          .executeTakeFirst();

        if (!result) {
          return Optional.empty();
        }

        return Optional.ofNonNull({
          id: result.id,
          name: result.name,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        });
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },

    async findChannels() {
      try {
        const res = await DB.selectFrom("Channel").selectAll().execute();
        return res.map((channel) => ({
          id: channel.id,
          createdAt: channel.createdAt,
          updatedAt: channel.updatedAt,
          name: channel.name,
        }));
      } catch (e) {
        return [];
      }
    },

    async persistChannel(channel) {
      if (!channel.id) {
        return Optional.empty();
      }

      try {
        await DB.insertInto("Channel")
          .values(structuredClone(channel))
          .executeTakeFirst();

        return this.findChannelById(channel.id);
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },
  };
}
