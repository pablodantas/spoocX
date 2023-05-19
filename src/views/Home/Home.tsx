import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from 'jetswap-uikit-new'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import { useTranslation } from 'contexts/Localization'

// Jets
import Jet1 from './components/Jet1'
import Jet2 from './components/Jet2'
import JetMobile from './components/JetMobile'

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 40px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const Background = styled.div`
  width: 100%;
  background-image: url('/images/assets/bg5.svg');

  background-repeat: no-repeat;
  background-position: center center;
`
const Flex = styled.div`
  display: flex;
`
const Container = styled.div``

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Background>
      <Page>
        <Hero>
          <JetMobile />
          <Flex>
            <Container>
              <Heading as="h1" fontSize="8" mb="20px" textAlign="left" style={{fontSize: "50px", WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(100deg, #CC3FBC, #436CE8, #FF8D00 40%)'}}>
                {t('JetSwap')}
              </Heading>
              <Text style={{color: "white"}}>{t("Welcome to SpocXswap, Jetfuel.Finance's AMM on BSC")}</Text>
            </Container>
            <Jet1 />
          </Flex>
        </Hero>
        <div>
          <Cards>
            <FarmStakingCard />
            <CakeStats />
          </Cards>
          <CTACards>
            <EarnAPYCard />
            <EarnAssetCard />
            <TotalValueLockedCard />
          </CTACards>
        </div>
      </Page>
    </Background>
  )
}

export default Home
