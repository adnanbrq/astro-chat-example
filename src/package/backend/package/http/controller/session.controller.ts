export interface SessionController {
  handleSignIn(email: string, password: string): Promise<Response>;
  handleSignUp(
    email: string,
    password: string,
    name: string
  ): Promise<Response>;
}
