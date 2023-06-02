import type { HttpRedirect } from "@backend/infrastructure/http/http-redirect";
import type { Hashing } from "../../crypto/hashing";
import type { UserRepository } from "../../database/repository/user.repository";
import type { UserSession } from "../session/user.session";
import type { SessionController } from "./session.controller";

type Props = {
  userRepository: UserRepository;
  hashing: Hashing;
  session: UserSession;
  redirect: HttpRedirect;
};

export function newSessionController({
  userRepository,
  hashing,
  session,
  redirect,
}: Props): SessionController {
  return {
    async handleSignIn(email, password) {
      try {
        const findUser = await userRepository.findByEmail(email);
        if (findUser.isEmpty()) {
          console.log(`No User found for eMail (${email})`);
          return redirect("/auth?noMatch");
        }

        const doesHashMatch = await hashing.Compare(
          password,
          findUser.get().password
        );

        if (!doesHashMatch) {
          console.log(`Password not matching for eMail (${email})`);
          return redirect("/auth?noMatch");
        }

        await session.CreateUserSession(findUser.get());
        return redirect("/channel");
      } catch (e) {
        console.error(e);
        return redirect("/auth");
      }
    },

    async handleSignUp(email, password, name) {
      try {
        const findUser = await userRepository.findByEmail(email);

        if (findUser.isPresent()) {
          console.log(`eMail already taken (${email})`);
          return redirect("/auth?emailTaken");
        }

        const hash = await hashing.Hash(password);
        const created = await userRepository.createUser({
          email,
          name,
          password: hash,
        });

        if (created.isEmpty()) {
          console.log(`Failed to create User for eMail (${email})`);
          return redirect("/auth");
        }

        await session.CreateUserSession(created.get());
        return redirect("/channel");
      } catch (e) {
        console.error(e);
        return redirect("/auth");
      }
    },
  };
}
