import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encryper: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encryper
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const accountData = await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
    return await new Promise((resolve) => resolve(accountData))
  }
}
