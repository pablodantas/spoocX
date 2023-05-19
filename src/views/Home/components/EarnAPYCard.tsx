import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'jetswap-uikit-new'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getFarmApy } from 'utils/apy'
import { useFarms, usePriceWingsBusd, useGetApiPrices } from 'state/hooks'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: #0B0A1E;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'lg' })`
  line-height: 44px;
  width: 75%;
  color: #fff;
`
const Circle = styled.div`
  background: #7058DA;
  margin-top: -50px;
  width: 59px;
  height: 59px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`

const EarnAPYCard = () => {
  const { t } = useTranslation()
  const farmsLP = useFarms()
  const prices = useGetApiPrices()
  const wingsPrice = usePriceWingsBusd()

  const 
  highestApr = useMemo(() => {
    const apys = farmsLP
      // Filter inactive farms, because their theoretical APY is super high. In practice, it's 0.
      .filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
      .map((farm) => {
        if (farm.lpTotalInQuoteToken && prices) {
          const quoteTokenPriceUsd = prices[farm.quoteToken.symbol.toLowerCase()]
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
          return getFarmApy(farm.poolWeight, wingsPrice, totalLiquidity)
        }
        return null
      })

    const maxApy = max(apys)
    return maxApy?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }, [wingsPrice, farmsLP, prices])

  const aprText = highestApr || '-'
  const earnAprText = t('Earn up to %highestApr% APR in Farms', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="#fff" size="lg">
          {earnUpTo}
        </Heading>
        <CardMidContent>
          {highestApr ? `${highestApr}%` : <Skeleton  animation="pulse" variant="rect" height="44px" />}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="#fff" size="lg">
            {InFarms}
          </Heading>
          <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <Circle>
              <ArrowForwardIcon color="#fff" />
            </Circle>
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
