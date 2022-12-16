import { AuthenticationParams } from "../../../domain/usecases/authentication";

export const mockAuthentication = (): AuthenticationParams => ({
  email: "any_email",
  password: "any_password",
});
