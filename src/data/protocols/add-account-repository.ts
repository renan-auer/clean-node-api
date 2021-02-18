import { AddAccountModel } from '../../domains/usecases/add-account'
import { AccountModel } from '../../domains/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
