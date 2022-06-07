import { faker } from '@faker-js/faker'
import { IAsset } from '@interfaces/account.interface'

export const getTradableAssetsList = (): Array<IAsset> => {
  const list = []
  for (let i = 1; i <= 200; i++) {
    const randomName = faker.company
      .companyName()
      .slice(0, Math.random() * 2 + 3)
      .replace("'", 'R')
      .toUpperCase()
    list.push({ tickerSymbol: randomName, sharePrice: i })
  }
  return list
}
