import { faker } from '@faker-js/faker'

import { ACCOUNT_ID } from '../constants/account-ids.const'
import { IAccount } from '../interfaces/account.interface'

export const accounts: Array<IAccount> = [
  { id: ACCOUNT_ID.EMMA, name: 'Emma', assets: [{ tickerSymbol: 'LAR', quantity: 2, sharePrice: 11 }] },
  { id: ACCOUNT_ID.USER_1, name: faker.company.companyName(), assets: [] },
  { id: ACCOUNT_ID.USER_2, name: faker.company.companyName(), assets: [] },
]
