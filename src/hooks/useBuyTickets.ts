import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLottery } from 'hooks/useContract'
import { buyTickets } from 'utils/callHelpers'

const generateLottoNumbers = (numberOfTickets, lottoSize, maxRange) => {
  const numberOfNumbers = []
  for (let i = 0; i < numberOfTickets; i++) {
    for (let j = 0; j < lottoSize; j++) {
      numberOfNumbers.push(Math.floor(Math.random() * maxRange))
    }
  }
  return numberOfNumbers
}

const useBuyTickets = (lotteryId, lotterySize, maxRange) => {
  const { account } = useWeb3React()
  const lotteryContract = useLottery()

  const handleBuyTicket = useCallback(
    async (ticketAmount) => {
      try {
        const ticketNumbers = generateLottoNumbers(ticketAmount, lotterySize, maxRange)
        const tx = await buyTickets(lotteryContract, lotteryId, ticketAmount, ticketNumbers, account)
        return tx
      } catch (e) {
        return false
      }
    },
    [account, lotteryContract, lotteryId, lotterySize, maxRange],
  )

  return { onBuyTickets: handleBuyTicket }
}

export default useBuyTickets
