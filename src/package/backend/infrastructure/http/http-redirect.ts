export type HttpRedirect = (
  path: string,
  status?: 301 | 302 | 303 | 307 | 308
) => Response;
