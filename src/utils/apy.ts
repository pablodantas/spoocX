import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import addresses from 'config/constants/contracts'
import {
  BLOCKS_PER_YEAR,
  BLOCKS_PER_DAY,
  WINGS_PER_BLOCK,
  CAKE_PER_BLOCK,
  BANANA_PER_BLOCK,
  AUTO_PER_BLOCK,
  VAULTS_DISTRIBUTION_PERCENTAGE,
} from 'config'
import fortressToken from 'config/abi/fortressToken.json'
import fortressIUnitroller from 'config/abi/fortressIUnitroller.json'
import venusToken from 'config/abi/venusToken.json'
import venusIUnitroller from 'config/abi/venusIUnitroller.json'

/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new wings allocated to the pool for each new block
 * @returns Null if the APY is NaN or infinite.
 */
export const getPoolApy = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param wingsPriceUSD WINGS price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApy = (poolWeight: BigNumber, wingsPriceUSD: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyCakeRewardAllocation = WINGS_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyCakeRewardAllocation.times(wingsPriceUSD).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

export const compound = (r, p = 1, n = 365, t = 1) => (1 + (p * r) / (n * t)) ** (n * t) - 1
/**
 * Get vault APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getVaultApy = (
  poolWeight: BigNumber,
  rewardPriceUSD: BigNumber,
  poolLiquidityUsd: BigNumber,
  provider?: string,
): number => {
  let REWARDS_PER_BLOCK = WINGS_PER_BLOCK
  if (provider === 'Pancake') {
    REWARDS_PER_BLOCK = CAKE_PER_BLOCK
  } else if (provider === 'autofarm') {
    REWARDS_PER_BLOCK = AUTO_PER_BLOCK
  } else if (provider === 'Apeswap') {
    REWARDS_PER_BLOCK = BANANA_PER_BLOCK
  }
  const yearlyWingsRewardAllocation = REWARDS_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const _apy = yearlyWingsRewardAllocation.times(rewardPriceUSD).div(poolLiquidityUsd).toString(10)
  const apy = new BigNumber(compound(_apy, VAULTS_DISTRIBUTION_PERCENTAGE, 365, 1)).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/* Get Single Fortress Vault APY */

const GetSupplyApys = async (asset, fortressRate, prices) => {
  let [supplyRate, totalSupply, exchangeRateStored] = await multicall(fortressToken, [
    {
      address: getAddress(asset.ftoken.address),
      name: 'supplyRatePerBlock',
      params: [],
    },
    {
      address: getAddress(asset.ftoken.address),
      name: 'totalSupply',
      params: [],
    },
    {
      address: getAddress(asset.ftoken.address),
      name: 'exchangeRateStored',
      params: [],
    },
  ])

  const fortressPrice = prices.fts
  let tokenPrice = prices.wbnb
  if (asset.lpSymbol === 'BTCB') {
    tokenPrice = prices.btcb
  } else if (asset.lpSymbol === 'ETH') {
    tokenPrice = prices.eth
  }

  supplyRate = new BigNumber(supplyRate)
  totalSupply = new BigNumber(totalSupply)
  exchangeRateStored = new BigNumber(exchangeRateStored)

  const supplyApyPerYear = supplyRate.times(BLOCKS_PER_YEAR).div('1e18')
  const supplyApyPerDay = supplyRate.times(BLOCKS_PER_DAY).div('1e18')

  const fortressPerYear = fortressRate.times(BLOCKS_PER_YEAR)
  const fortressPerYearInUsd = fortressPerYear.div('1e18').times(fortressPrice)

  const fortressPerDay = fortressRate.times(BLOCKS_PER_DAY)
  const fortressPerDayInUsd = fortressPerDay.div('1e18').times(fortressPrice)

  const totalSupplied = totalSupply.times(exchangeRateStored).div('1e18')
  const totalSuppliedInUsd = totalSupplied.div('1e18').times(tokenPrice)

  return {
    supplyBase: [supplyApyPerYear, supplyApyPerDay],
    supplyFts: [fortressPerYearInUsd.div(totalSuppliedInUsd), fortressPerDayInUsd.div(totalSuppliedInUsd)],
  }
}

const GetBorrowApys = async (asset, fortressRate, prices) => {
  let [borrowRate, totalBorrows] = await multicall(fortressToken, [
    {
      address: getAddress(asset.ftoken.address),
      name: 'borrowRatePerBlock',
      params: [],
    },
    {
      address: getAddress(asset.ftoken.address),
      name: 'totalBorrows',
      params: [],
    },
  ])

  const fortressPrice = prices.fts
  let tokenPrice = prices.wbnb
  if (asset.lpSymbol === 'BTCB') {
    tokenPrice = prices.btcb
  } else if (asset.lpSymbol === 'ETH') {
    tokenPrice = prices.eth
  }

  borrowRate = new BigNumber(borrowRate)
  totalBorrows = new BigNumber(totalBorrows)

  const borrowApyPerYear = borrowRate.times(BLOCKS_PER_YEAR).div('1e18')
  const borrowApyPerDay = borrowRate.times(BLOCKS_PER_DAY).div('1e18')

  const fortressPerYear = fortressRate.times(BLOCKS_PER_YEAR)
  const fortressPerYearInUsd = fortressPerYear.div('1e18').times(fortressPrice)

  const fortressPerDay = fortressRate.times(BLOCKS_PER_DAY)
  const fortressPerDayInUsd = fortressPerDay.div('1e18').times(fortressPrice)

  const totalBorrowsInUsd = totalBorrows.div('1e18').times(tokenPrice)

  return {
    borrowBase: [borrowApyPerYear, borrowApyPerDay],
    borrowFts: [fortressPerYearInUsd.div(totalBorrowsInUsd), fortressPerDayInUsd.div(totalBorrowsInUsd)],
  }
}

const getLeveragedApys = (supplyBase, borrowBase, supplyFts, borrowFts, depth, _borrowPercent) => {
  const borrowPercent = new BigNumber(_borrowPercent)
  let leveragedSupplyBase = new BigNumber(0)
  let leveragedBorrowBase = new BigNumber(0)
  let leveragedSupplyFts = new BigNumber(0)
  let leveragedBorrowFts = new BigNumber(0)

  for (let i = 0; i <= depth; i += 1) {
    leveragedSupplyBase = leveragedSupplyBase.plus(supplyBase.times(borrowPercent.toExponential(depth - i)))
    leveragedSupplyFts = leveragedSupplyFts.plus(supplyFts.times(borrowPercent.toExponential(depth - i)))
  }

  for (let i = 0; i < depth; i += 1) {
    leveragedBorrowBase = leveragedBorrowBase.plus(borrowBase.times(borrowPercent.toExponential(depth - i)))
    leveragedBorrowFts = leveragedBorrowFts.plus(borrowFts.times(borrowPercent.toExponential(depth - i)))
  }

  return {
    leveragedSupplyBase,
    leveragedBorrowBase,
    leveragedSupplyFts,
    leveragedBorrowFts,
  }
}

export const getSingleFortressVaultApy = async (asset, prices) => {
  const [_fortressRate] = await multicall(fortressIUnitroller, [
    {
      address: getAddress(addresses.fortressIUnitroller),
      name: 'fortressSpeeds',
      params: [getAddress(asset.ftoken.address)],
    },
  ])
  const fortressRate = new BigNumber(_fortressRate)
  const [{ supplyBase, supplyFts }, { borrowBase, borrowFts }] = await Promise.all([
    GetSupplyApys(asset, fortressRate, prices),
    GetBorrowApys(asset, fortressRate, prices),
  ])

  const yearlyLeverageParams = [supplyBase[0], borrowBase[0], supplyFts[0], borrowFts[0], 3, 0.54]
  const yearlyLeverageData = getLeveragedApys(
    yearlyLeverageParams[0],
    yearlyLeverageParams[1],
    yearlyLeverageParams[2],
    yearlyLeverageParams[3],
    yearlyLeverageParams[4],
    yearlyLeverageParams[5],
  )

  const dailyLeverageParams = [supplyBase[1], borrowBase[1], supplyFts[1], borrowFts[1], 3, 0.54]
  const dailyLeverageData = getLeveragedApys(
    dailyLeverageParams[0],
    dailyLeverageParams[1],
    dailyLeverageParams[2],
    dailyLeverageParams[3],
    dailyLeverageParams[4],
    dailyLeverageParams[5],
  )

  const apys = [yearlyLeverageData, dailyLeverageData].reduce(
    (_acc, { leveragedSupplyBase, leveragedBorrowBase, leveragedSupplyFts, leveragedBorrowFts }, index) => {
      const daily = index === 1

      const totalFTS = leveragedSupplyFts.plus(leveragedBorrowFts)
      const compoundedFts = compound(totalFTS, VAULTS_DISTRIBUTION_PERCENTAGE, daily ? 1 : 365, 1)
      const apy = leveragedSupplyBase.minus(leveragedBorrowBase).plus(compoundedFts)

      return [..._acc, apy.times(100).toString()]
    },
    [],
  )
  return apys
}

// Get Venus Vault APY

const GetVenusSupplyApys = async (asset, venusRate, prices) => {
  let [supplyRate, totalSupply, exchangeRateStored] = await multicall(venusToken, [
    {
      address: getAddress(asset.ftoken.address),
      name: 'supplyRatePerBlock',
      params: [],
    },
    {
      address: getAddress(asset.ftoken.address),
      name: 'totalSupply',
      params: [],
    },
    {
      address: getAddress(asset.ftoken.address),
      name: 'exchangeRateStored',
      params: [],
    },
  ])

  const venusPrice = prices.xvs
  let tokenPrice = prices.wbnb
  if (asset.lpSymbol === 'BTCB') {
    tokenPrice = prices.btcb
  } else if (asset.lpSymbol === 'ETH') {
    tokenPrice = prices.eth
  }

  supplyRate = new BigNumber(supplyRate)
  totalSupply = new BigNumber(totalSupply)
  exchangeRateStored = new BigNumber(exchangeRateStored)

  const supplyApyPerYear = supplyRate.times(BLOCKS_PER_YEAR).div('1e18')
  const supplyApyPerDay = supplyRate.times(BLOCKS_PER_DAY).div('1e18')

  const venusPerYear = venusRate.times(BLOCKS_PER_YEAR)
  const venusPerYearInUsd = venusPerYear.div('1e18').times(venusPrice)

  const venusPerDay = venusRate.times(BLOCKS_PER_DAY)
  const venusPerDayInUsd = venusPerDay.div('1e18').times(venusPrice)

  const totalSupplied = totalSupply.times(exchangeRateStored).div('1e18')
  const totalSuppliedInUsd = totalSupplied.div('1e18').times(tokenPrice)

  return {
    supplyBase: [supplyApyPerYear, supplyApyPerDay],
    supplyXvs: [venusPerYearInUsd.div(totalSuppliedInUsd), venusPerDayInUsd.div(totalSuppliedInUsd)],
  }
}

const GetVenusBorrowApys = async (asset, venusRate, prices) => {
  let [borrowRate, totalBorrows] = await multicall(venusToken, [
    {
      address: getAddress(asset.ftoken.address),
      name: 'borrowRatePerBlock',
      params: [],
    },
    {
      address: getAddress(asset.ftoken.address),
      name: 'totalBorrows',
      params: [],
    },
  ])

  const venusPrice = prices.xvs
  let tokenPrice = prices.wbnb
  if (asset.lpSymbol === 'BTCB') {
    tokenPrice = prices.btcb
  } else if (asset.lpSymbol === 'ETH') {
    tokenPrice = prices.eth
  }

  borrowRate = new BigNumber(borrowRate)
  totalBorrows = new BigNumber(totalBorrows)

  const borrowApyPerYear = borrowRate.times(BLOCKS_PER_YEAR).div('1e18')
  const borrowApyPerDay = borrowRate.times(BLOCKS_PER_DAY).div('1e18')

  const venusPerYear = venusRate.times(BLOCKS_PER_YEAR)
  const venusPerYearInUsd = venusPerYear.div('1e18').times(venusPrice)

  const venusPerDay = venusRate.times(BLOCKS_PER_DAY)
  const venusPerDayInUsd = venusPerDay.div('1e18').times(venusPrice)

  const totalBorrowsInUsd = totalBorrows.div('1e18').times(tokenPrice)

  return {
    borrowBase: [borrowApyPerYear, borrowApyPerDay],
    borrowXvs: [venusPerYearInUsd.div(totalBorrowsInUsd), venusPerDayInUsd.div(totalBorrowsInUsd)],
  }
}

const getVenusLeveragedApys = (supplyBase, borrowBase, supplyXvs, borrowFts, depth, _borrowPercent) => {
  const borrowPercent = new BigNumber(_borrowPercent)
  let leveragedSupplyBase = new BigNumber(0)
  let leveragedBorrowBase = new BigNumber(0)
  let leveragedSupplyXvs = new BigNumber(0)
  let leveragedBorrowXvs = new BigNumber(0)

  for (let i = 0; i <= depth; i += 1) {
    leveragedSupplyBase = leveragedSupplyBase.plus(supplyBase.times(borrowPercent.toExponential(depth - i)))
    leveragedSupplyXvs = leveragedSupplyXvs.plus(supplyXvs.times(borrowPercent.toExponential(depth - i)))
  }

  for (let i = 0; i < depth; i += 1) {
    leveragedBorrowBase = leveragedBorrowBase.plus(borrowBase.times(borrowPercent.toExponential(depth - i)))
    leveragedBorrowXvs = leveragedBorrowXvs.plus(borrowFts.times(borrowPercent.toExponential(depth - i)))
  }

  return {
    leveragedSupplyBase,
    leveragedBorrowBase,
    leveragedSupplyXvs,
    leveragedBorrowXvs,
  }
}

export const getSingleVenusVaultApy = async (asset, prices) => {
  const [_venusRate] = await multicall(venusIUnitroller, [
    {
      address: getAddress(addresses.venusIUnitroller),
      name: 'venusSpeeds',
      params: [getAddress(asset.ftoken.address)],
    },
  ])
  const venusRate = new BigNumber(_venusRate)
  const [{ supplyBase, supplyXvs }, { borrowBase, borrowXvs }] = await Promise.all([
    GetVenusSupplyApys(asset, venusRate, prices),
    GetVenusBorrowApys(asset, venusRate, prices),
  ])

  const yearlyLeverageParams = [supplyBase[0], borrowBase[0], supplyXvs[0], borrowXvs[0], 3, 0.54]
  const yearlyLeverageData = getVenusLeveragedApys(
    yearlyLeverageParams[0],
    yearlyLeverageParams[1],
    yearlyLeverageParams[2],
    yearlyLeverageParams[3],
    yearlyLeverageParams[4],
    yearlyLeverageParams[5],
  )

  const dailyLeverageParams = [supplyBase[1], borrowBase[1], supplyXvs[1], borrowXvs[1], 3, 0.54]
  const dailyLeverageData = getVenusLeveragedApys(
    dailyLeverageParams[0],
    dailyLeverageParams[1],
    dailyLeverageParams[2],
    dailyLeverageParams[3],
    dailyLeverageParams[4],
    dailyLeverageParams[5],
  )

  const apys = [yearlyLeverageData, dailyLeverageData].reduce(
    (_acc, { leveragedSupplyBase, leveragedBorrowBase, leveragedSupplyXvs, leveragedBorrowXvs }, index) => {
      const daily = index === 1

      const totalXVS = leveragedSupplyXvs.plus(leveragedBorrowXvs)
      const compoundedXvs = compound(totalXVS, VAULTS_DISTRIBUTION_PERCENTAGE, daily ? 1 : 365, 1)
      const apy = leveragedSupplyBase.minus(leveragedBorrowBase).plus(compoundedXvs)

      return [..._acc, apy.times(100).toString()]
    },
    [],
  )
  return apys
}

export default null
