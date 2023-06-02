import type { CookiesContract } from "./infrastructure/http/http-cookie";
import type { HttpRedirect } from "./infrastructure/http/http-redirect";
import { newEncryption } from "./package/crypto/encryption.impl";
import { newHashing } from "./package/crypto/hashing.impl";
import { newDB } from "./package/database/database";
import {
  ChannelRepository,
  newChannelRepository,
} from "./package/database/repository/channel.repository";
import {
  MessageRepository,
  newMessageRepository,
} from "./package/database/repository/message.repository";
import { newUserRepository } from "./package/database/repository/user.repository";
import type { ChannelController } from "./package/http/controller/channel.controller";
import { newChannelController } from "./package/http/controller/channel.controller.impl";
import type { MessageController } from "./package/http/controller/message.controller";
import { newMessageController } from "./package/http/controller/message.controller.impl";
import type { SessionController } from "./package/http/controller/session.controller";
import { newSessionController } from "./package/http/controller/session.controller.impl";
import type { UserSession } from "./package/http/session/user.session";
import { newUserSession } from "./package/http/session/user.session.impl";

interface AppContainer {
  getUserSession(cookies: CookiesContract): UserSession;
  getSessionController(
    cookies: CookiesContract,
    redirect: HttpRedirect
  ): SessionController;
  getMessageController(): MessageController;
  getChannelController(): ChannelController;
  getChannelRepository(): ChannelRepository;
  getMessageRepository(): MessageRepository;
}

export function newAppContainer(): AppContainer {
  const DB = newDB();
  const userRepository = newUserRepository({ DB });
  const messageRepository = newMessageRepository({ DB });
  const channelRepository = newChannelRepository({ DB });
  const encryption = newEncryption();
  const hashing = newHashing();

  return {
    getSessionController(cookies, redirect) {
      return newSessionController({
        userRepository,
        hashing,
        redirect,
        session: this.getUserSession(cookies),
      });
    },

    getMessageController() {
      return newMessageController({ messageRepository });
    },

    getChannelController() {
      return newChannelController({ channelRepository });
    },

    getUserSession(cookies) {
      return newUserSession({ userRepository, encryption, cookies });
    },

    getChannelRepository() {
      return channelRepository;
    },

    getMessageRepository() {
      return messageRepository;
    },
  };
}
