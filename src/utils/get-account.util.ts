import { IAccount } from '@interfaces/account.interface'
import { accounts } from '@mocks/index.mock'

export const getAccountByID = (id): IAccount => accounts.find((account: IAccount) => account.id === id)
export const getAccountByUserId = (userId): IAccount => accounts.find((account: IAccount) => account.userId === userId)
