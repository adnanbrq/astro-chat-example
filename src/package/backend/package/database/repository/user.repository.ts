import type { Insertable, Selectable } from "kysely";
import { Optional } from "typescript-optional";
import type { KyselyInstance } from "../database";
import type { SelectUserEntity, UserEntity } from "../entity/user.entity";

export interface UserRepository {
  findByEmail(email: UserEntity["email"]): Promise<Optional<SelectUserEntity>>;
  createUser(data: Insertable<UserEntity>): Promise<Optional<SelectUserEntity>>;
}

type Props = {
  DB: KyselyInstance;
};

export function newUserRepository({ DB }: Props): UserRepository {
  return {
    async findByEmail(email) {
      try {
        const result = await DB.selectFrom("User")
          .selectAll()
          .where("User.email", "=", email)
          .executeTakeFirst();

        if (!result) {
          return Optional.empty();
        }

        return Optional.ofNonNull({
          id: result.id,
          name: result.name,
          email: result.email,
          password: result.password,
        });
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },

    async createUser(data) {
      try {
        const res = await DB.insertInto("User").values(data).executeTakeFirst();

        if (!res || (res && isNaN(Number(res.insertId)))) {
          return Optional.empty();
        }

        return this.findByEmail(data.email);
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },
  };
}
