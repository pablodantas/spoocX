import { usePriceWingsBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const wingsPriceUsd = usePriceWingsBusd()

  return totalCake * wingsPriceUsd.toNumber()
}

export default useLotteryTotalPrizesUsd
