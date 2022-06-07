import { faker } from '@faker-js/faker'

export class BrokerServiceMock {
  listTradableAssets() {
    return [{ tickerSymbol: 'GRD' }, { tickerSymbol: 'GAAS' }]
  }
  isMarketOpen() {
    return {
      open: false,
      nextOpeningTime: faker.date.soon(0.5).toISOString(),
      nextClosingTime: faker.date.soon(1).toISOString(),
    }
  }
  getLatestPrice() {
    return { sharePrice: 3 }
  }
}
