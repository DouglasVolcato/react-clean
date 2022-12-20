import { mockAccountModel } from "../../data/test/mock-account";
import { AccountModel } from "../../domain/models/account-model";
import {
  Authentication,
  AuthenticationParams,
} from "../../domain/usecases/authentication";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
