import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from 'jetswap-uikit-new'
import PastLotteryRoundViewer from './components/PastLotteryRoundViewer'
import PastDrawsHistoryCard from './components/PastDrawsHistory/PastDrawsHistoryCard'

const Cards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const SecondCardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: flex;
  flex-direction: column;
`

const BunnyImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const PastDrawsPage: React.FC = () => {
  return (
    <Cards>
      <PastLotteryRoundViewer />
      <SecondCardColumnWrapper>
        <PastDrawsHistoryCard />
        <BunnyImageWrapper>
          <img src="/images/assets/lotteryImage1.png" alt="lottery bunny" width={250} height={230} />
        </BunnyImageWrapper>
      </SecondCardColumnWrapper>
    </Cards>
  )
}

export default PastDrawsPage
