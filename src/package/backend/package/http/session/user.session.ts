import type { Optional } from "typescript-optional";
import type { SelectUserEntity } from "../../database/entity/user.entity";
import { z } from "zod";

export const UserSessionDataSchema = z.object({
  email: z.string().email(),
});

export type UserSessionData = z.infer<typeof UserSessionDataSchema>;

export interface UserSession {
  GetUserFromSession(): Promise<Optional<SelectUserEntity>>;
  CreateUserSession(user: SelectUserEntity): Promise<void>;
  RevokeSession(): void;
}
