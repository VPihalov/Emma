export interface IRewardConfig {
  lowMin: number
  lowMax: number
  middleMin: number
  middleMax: number
  highMin: number
  highMax: number
}

export interface IRewardList {
  value: number
  probability: number
}

export interface IRewardRateList extends IRewardList {
  rate: number
}
