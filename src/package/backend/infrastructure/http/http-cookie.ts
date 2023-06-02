export interface CookieContract {
  value?: string;
  number(): number;
}

export interface CookiesContract {
  get(key: string): CookieContract;
  has(key: string): boolean;
  set(key: string, value: string, opts: Record<string, any>): void;
  delete(key: string, opts: Record<string, any>): void;
}
