import { ACCOUNT_ID, USER_ID } from '@constants/index.const'
import { IAccount } from '@interfaces/index.interface'

export const accounts: Array<IAccount> = [
  { id: ACCOUNT_ID.EMMA, userId: USER_ID.EMMA, assets: [{ tickerSymbol: 'LAR', quantity: 5, sharePrice: 11 }] },
  { id: ACCOUNT_ID.USER_1, userId: USER_ID.USER_1, assets: [] },
  { id: ACCOUNT_ID.USER_2, userId: USER_ID.USER_2, assets: [] },
]
