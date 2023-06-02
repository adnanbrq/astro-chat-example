export interface Encryption {
  Encrypt: <T = unknown>(data: T) => Promise<string>;
  Decrypt: <T = unknown>(input: string) => Promise<T>;
}
