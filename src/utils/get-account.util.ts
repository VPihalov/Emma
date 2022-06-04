import { accounts } from '../mocks/accounts.mock'

export const getAccountByID = (id) => accounts.find((account) => account.id === id)
