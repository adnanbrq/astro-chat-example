export interface Hashing {
  Hash: (plain: string) => Promise<string>;
  Compare: (plain: string, hashed: string) => Promise<boolean>;
}
