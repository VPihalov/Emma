import { USER_ID } from '@constants/index.const'
import { faker } from '@faker-js/faker'
import { IUser } from '@interfaces/index.interface'

export const users: Array<IUser> = [
  { id: USER_ID.EMMA, name: 'Emma' },
  { id: USER_ID.USER_1, name: faker.company.companyName() },
  { id: USER_ID.USER_2, name: faker.company.companyName() },
]
