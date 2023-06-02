import type { CookiesContract } from "@backend/infrastructure/http/http-cookie";
import { Optional } from "typescript-optional";
import type { Encryption } from "../../crypto/encryption";
import type { UserRepository } from "../../database/repository/user.repository";
import {
  UserSession,
  UserSessionData,
  UserSessionDataSchema,
} from "./user.session";

type Props = {
  encryption: Encryption;
  userRepository: UserRepository;
  cookies: CookiesContract;
};

export function newUserSession({
  userRepository,
  encryption,
  cookies,
}: Props): UserSession {
  return {
    async GetUserFromSession() {
      try {
        if (!cookies.has(import.meta.env.COOKIE_KEY)) {
          return Optional.empty();
        }

        const seal = cookies.get(import.meta.env.COOKIE_KEY).value || "";
        const data = await encryption.Decrypt(seal);
        const { email } = UserSessionDataSchema.parse(data);

        return userRepository.findByEmail(email);
      } catch (e) {
        return Optional.empty();
      }
    },

    async CreateUserSession(user) {
      const seal = await encryption.Encrypt<UserSessionData>({
        email: user.email,
      });

      cookies.set(import.meta.env.COOKIE_KEY, seal, {
        secure: false,
        httpOnly: true,
        sameSite: true,
        path: "/",
      });
    },

    RevokeSession() {
      cookies.delete(import.meta.env.COOKIE_KEY, { path: "/" });
    },
  };
}
