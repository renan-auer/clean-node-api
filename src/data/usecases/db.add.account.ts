import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encryper: Encrypter) {
    this.encrypter = encryper
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise((resolve) => resolve(null))
  }
}
