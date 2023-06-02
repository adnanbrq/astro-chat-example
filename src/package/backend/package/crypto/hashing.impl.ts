import { scrypt } from "crypto";
import type { Hashing } from "./hashing";

export function newHashing(): Hashing {
  return {
    Hash(plain: string) {
      return new Promise((res, rej) => {
        scrypt(plain, import.meta.env.SESSION_SALT, 64, (err, key) => {
          if (err) {
            rej(err);
          } else {
            res(key.toString("hex"));
          }
        });
      });
    },

    Compare(plain: string, hash: string) {
      return this.Hash(plain)
        .then((value) => value === hash)
        .catch((e) => false);
    },
  };
}
