/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly COOKIE_SECRET: string;
  readonly COOKIE_KEY: string;
  readonly SESSION_SALT: string;
  readonly SESSION_LEN: number;

  readonly PUSHER_APP_ID: string;
  readonly PUSHER_SECRET: string;
  readonly PUBLIC_PUSHER_KEY: string;
  readonly PUBLIC_PUSHER_CLUSTER: string;

  readonly DB_HOST: string;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
  readonly DB_NAME: string;
}
