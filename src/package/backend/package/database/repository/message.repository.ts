import type { Insertable } from "kysely";
import { Optional } from "typescript-optional";
import type { KyselyInstance } from "../database";
import type { SelectChannelEntity } from "../entity/channel.entity";
import type {
  MessageEntity,
  SelectMessageEntity,
} from "../entity/message.entity";
import type { SelectUserEntity } from "../entity/user.entity";

type MessageID = SelectMessageEntity["id"];
type ChannelID = SelectChannelEntity["id"];
type MessageWithUser = SelectMessageEntity & {
  user: Pick<SelectUserEntity, "id" | "name" | "email">;
};

export interface MessageRepository {
  findById(id: MessageID): Promise<Optional<MessageWithUser>>;
  findMessagesByChannel(channelId: ChannelID): Promise<MessageWithUser[]>;
  persistMessage(
    message: Insertable<MessageEntity>
  ): Promise<Optional<MessageWithUser>>;
}

type Props = {
  DB: KyselyInstance;
};

export function newMessageRepository({ DB }: Props): MessageRepository {
  return {
    async findById(id) {
      try {
        const result = await DB.selectFrom("Message")
          .innerJoin("User", "User.id", "Message.userId")
          .select([
            "Message.id",
            "Message.channelId",
            "Message.createdAt",
            "Message.deletedAt",
            "Message.updatedAt",
            "Message.content",
            "User.id as userId",
            "User.name as userName",
            "User.email as userEmail",
          ])
          .where("Message.id", "=", id)
          .executeTakeFirst();

        if (!result) {
          return Optional.empty();
        }

        return Optional.ofNonNull({
          id: result.id,
          content: result.content,
          channelId: result.channelId,
          userId: result.userId,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
          deletedAt: result.deletedAt,
          user: {
            id: result.userId,
            email: result.userEmail,
            name: result.userName,
          },
        });
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },

    async persistMessage(message) {
      try {
        const result = await DB.insertInto("Message")
          .values(structuredClone(message))
          .returning("Message.id")
          .executeTakeFirst();

        return this.findById(result?.id ?? -999);
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },

    async findMessagesByChannel(channelId) {
      try {
        const res = await DB.selectFrom("Message")
          .where("Message.channelId", "=", channelId)
          .innerJoin("Channel", "Channel.id", "Message.channelId")
          .innerJoin("User", "User.id", "Message.userId")
          .select([
            "Message.id",
            "Message.channelId",
            "Message.createdAt",
            "Message.deletedAt",
            "Message.updatedAt",
            "Message.content",
            "User.id as userId",
            "User.name as userName",
            "User.email as userEmail",
          ])
          .execute();

        return res.map((m) => ({
          id: m.id,
          content: m.content,
          channelId: m.channelId,
          userId: m.userId,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
          deletedAt: m.deletedAt,
          user: {
            id: m.userId,
            email: m.userEmail,
            name: m.userName,
          },
        }));
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  };
}
