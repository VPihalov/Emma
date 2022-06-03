import { faker } from '@faker-js/faker'

export const getTradableAssetsList = () => {
  const list = []
  for (let i = 101; i <= 200; i++) {
    const randomName = faker.company
      .companyName()
      .slice(0, Math.random() * 2 + 3)
      .replace("'", 'R')
      .toUpperCase()
    list.push({ tickerSymbol: randomName, sharePrice: i })
  }
  return list
}
