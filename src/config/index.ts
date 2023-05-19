import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3
export const WINGS_PER_BLOCK = new BigNumber(2)
export const CAKE_PER_BLOCK = new BigNumber(40)
export const BANANA_PER_BLOCK = new BigNumber(10)
export const AUTO_PER_BLOCK = new BigNumber(0.008)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const BLOCKS_PER_DAY = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24) // 28800
export const VAULTS_DISTRIBUTION_PERCENTAGE = 0.94
export const BASE_URL = 'https://jetswap.finance'
export const BASE_EXCHANGE_URL = 'https://exchange.jetswap.finance/'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const START_BLOCK_NUMBER = 7580000
