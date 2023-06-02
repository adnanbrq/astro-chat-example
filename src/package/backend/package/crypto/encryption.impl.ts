import { defaults, seal, unseal } from "@hapi/iron";
import type { Encryption } from "./encryption";

export function newEncryption(): Encryption {
  return {
    async Encrypt(data) {
      return seal(data, import.meta.env.COOKIE_SECRET, defaults);
    },

    async Decrypt(input) {
      return unseal(input, import.meta.env.COOKIE_SECRET, defaults);
    },
  };
}
