export class HttpResponse extends Response {
  public static json<T = unknown>(body: T, init?: ResponseInit): Response {
    return new Response(JSON.stringify(body), init);
  }
}
