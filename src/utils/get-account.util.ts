import { IAccount } from '@interfaces/account.interface'
import { accounts } from '@mocks/index.mock'

export const getAccountByID = (id): IAccount => accounts.find((account) => account.id === id)
