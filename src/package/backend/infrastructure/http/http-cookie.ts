export interface CookieContract {
  value?: string;

  json(): any;

  number(): number;

  boolean(): boolean;
}

export interface CookiesContract {
  get(key: string): CookieContract | undefined;

  has(key: string): boolean;

  set(key: string, value: string, opts: Record<string, any>): void;

  delete(key: string, opts: Record<string, any>): void;
}
