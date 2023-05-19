import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, Heading, Flex, Text, Button, useModal } from 'jetswap-uikit-new'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { getJetsAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { getJetsContract, getFuelContract } from 'utils/contractHelpers'
import { BigNumber } from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import { usePriceFuelBusd } from 'state/hooks'
import Balance from 'components/Balance'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import ConvertionModal from './components/ConvertionModal'

const Background = styled.div`
  width: 100%;
  background-image: url('/images/assets/bg-jets.svg');
  background-repeat: no-repeat;
  background-position: top right;
`

const StyledContainer = styled(Container)`
  /* max-width: 1034px; */
  height: 100%;
  padding: 0 10px 10px 10px;
  margin-bottom: 60px;
`

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledCard = styled(Card)`
  background-size: contain;
  padding: 41px 25px;
  max-width: 492px;
  width: 100%;
  border-radius: 20px;
  box-shadow: none;
  margin-right: 20px;
  :last-child {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
    margin-right: 0;
    margin-bottom: 15px;
    :last-child {
      margin-bottom: 0;
    }
  }
`

const StyledCardHeader = styled(Flex)`
  & > div {
    flex: 1;
  }
  margin-bottom: 48px;
  @media (max-width: 768px) {
    margin-bottom: 28px;
  }
`

const Name = styled(Text)`
  margin-bottom: 4px;
  text-align: left;
  margin-left: 20px;
  font-size: 16px;
`

const Description = styled(Heading).attrs({ as: 'h2', size: 'lg' })`
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledButton = styled(Button)`
  width: 100%;
  font-weight: bold;
  font-size: 19px;
  text-align: right;
  text-transform: capitalize;
  color: #2a2a2a;
`

const TotalPoolCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 30px 43px;
  width: 100%;
  border-radius: 20px;
  box-shadow: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`

const TipsCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 30px 43px;
  width: 100%;
  border-radius: 20px;
  box-shadow: none;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 20px; */
  @media (max-width: 768px) {
    padding: 20px 20px;
    margin-top: 20px;
  }
`

const TotalStakedUsd = styled(Heading).attrs({ as: 'h2', size: 'lg' })`
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
  font-size: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TitleWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    div:last-child {
      margin-left: 6px;
    }
  }
`

const useBalances = () => {
  const usdPrice = usePriceFuelBusd()
  const { account } = useWeb3React()
  const [refresh, setRefresh] = useState(1)
  const { fastRefresh } = useRefresh()

  const [data, setData] = useState({
    jetsBalance: new BigNumber(0),
    fuelBalance: new BigNumber(0),
    jetsTotalSupply: new BigNumber(0),
    stakedAmount: new BigNumber(0),
  })

  const checkTotalStakedStatus = useCallback(() => {
    setRefresh((prevRefresh) => prevRefresh + 1)
  }, [setRefresh])

  useEffect(() => {
    const fetch = async () => {
      try {
        const jetsContract = getJetsContract()
        const fuelContract = getFuelContract()

        if (account) {
          const [jetsBalance, fuelBalance, jetsTotalSupply, stakedAmount] = await Promise.all([
            jetsContract.methods.balanceOf(account).call(),
            fuelContract.methods.balanceOf(account).call(),
            jetsContract.methods.totalSupply().call(),
            fuelContract.methods.balanceOf(getJetsAddress()).call(),
          ])

          setData((prevState) => ({
            ...prevState,
            jetsBalance: new BigNumber(jetsBalance),
            fuelBalance: new BigNumber(fuelBalance),
            jetsTotalSupply: new BigNumber(jetsTotalSupply),
            stakedAmount: new BigNumber(stakedAmount),
          }))
        } else {
          const [jetsTotalSupply, stakedAmount] = await Promise.all([
            jetsContract.methods.totalSupply().call(),
            fuelContract.methods.balanceOf(getJetsAddress()).call(),
          ])
          setData((prevState) => ({
            ...prevState,
            jetsTotalSupply: new BigNumber(jetsTotalSupply),
            stakedAmount: new BigNumber(stakedAmount),
          }))
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetch()
  }, [fastRefresh, refresh, account, checkTotalStakedStatus])

  const { share } = useMemo(() => {
    const _share = data.jetsTotalSupply.gt(0)
      ? data.jetsBalance.div(data.jetsTotalSupply).times(data.stakedAmount)
      : new BigNumber(0)
    return { share: _share, shareUsd: new BigNumber(1) }
  }, [data])

  return { ...data, account, usdPrice, share, checkTotalStakedStatus }
}

const Jets: React.FC = () => {
  const { t } = useTranslation()

  const { account, jetsBalance, fuelBalance, stakedAmount, share, jetsTotalSupply } = useBalances()
  const usdPrice = usePriceFuelBusd()

  const [onJetsConvertModal] = useModal(<ConvertionModal balance={jetsBalance} type={0} />, true)

  const [onFuelConvertModal] = useModal(<ConvertionModal balance={fuelBalance} type={1} />, true)

  return (
    <Background>
      <Hero />
      <StyledContainer>
        <CardsWrapper>
          <StyledCard>
            <StyledCardHeader alignItems="center">
              <img src="/images/jets1.svg" alt="jets1" width="64px" height="64px" />
              <div>
                <Name>{t(`JETS Token (balance)`)}</Name>
                <Description>
                  <Balance
                    fontSize="24px"
                    value={account ? getBalanceNumber(jetsBalance) : 0}
                    decimals={!account || !jetsBalance.gt(0) ? 4 : 5}
                  />
                  &nbsp;JETS
                </Description>
              </div>
            </StyledCardHeader>
            <StyledButton
              onClick={() => {
                onJetsConvertModal()
              }}
            >
              {t(`Convert to FUEL`)}
            </StyledButton>
          </StyledCard>
          <StyledCard>
            <StyledCardHeader alignItems="center">
              <img src="/images/jets2.svg" alt="jets1" width="64px" height="64px" />
              <div>
                <Name>{t(`FUEL Token (balance)`)}</Name>
                <Description>
                  <Balance
                    fontSize="24px"
                    value={account ? getBalanceNumber(fuelBalance) : 0}
                    decimals={!account || !fuelBalance.gt(0) ? 4 : 5}
                  />
                  &nbsp;FUEL
                </Description>
              </div>
            </StyledCardHeader>
            <StyledButton
              onClick={() => {
                onFuelConvertModal()
              }}
            >
              {t(`Convert to JETS`)}
            </StyledButton>
          </StyledCard>
        </CardsWrapper>

        <TotalPoolCard>
          <TitleWrapper>
            <Text fontSize="18px">{t(`Your Total Pool`)}</Text>
            <Text fontSize="18px">{t(`Share In FUEL`)}</Text>
          </TitleWrapper>
          <Description style={{ marginLeft: '0' }}>
            <Balance fontSize="24px" value={getBalanceNumber(share)} decimals={4} />
            <span>&nbsp;($&nbsp;</span>
            <Balance fontSize="24px" value={getBalanceNumber(share.times(usdPrice))} decimals={2} />
            <span>)</span>
          </Description>
        </TotalPoolCard>

        <CardsWrapper>
          <StyledCard>
            <Text fontSize="18px">{t(`Total staking FUEL locked value`)}</Text>
            <TotalStakedUsd>
              <span>$&nbsp;</span>
              <Balance fontSize="24px" value={getBalanceNumber(stakedAmount.multipliedBy(usdPrice))} decimals={2} />
            </TotalStakedUsd>
          </StyledCard>
          <StyledCard>
            <Text fontSize="18px">{t(`Total FUEL staked`)}</Text>
            <Balance fontSize="24px" value={getBalanceNumber(stakedAmount)} decimals={5} />
          </StyledCard>
          <StyledCard>
            <Text fontSize="18px">{t(`Current JETS Rate`)}</Text>
            <Description style={{ fontSize: '24px', marginLeft: '0' }}>
              <span>1&nbsp;JETS&nbsp;&asymp;&nbsp;</span>
              <Balance
                fontSize="24px"
                value={getBalanceNumber(stakedAmount.dividedBy(jetsTotalSupply), 0)}
                decimals={2}
              />
              <span>&nbsp;FUEL</span>
            </Description>
          </StyledCard>
        </CardsWrapper>

        <TipsCard>
          <Text fontSize="24px" bold style={{ textAlign: 'center' }}>
            {t(`Tips`)}
          </Text>
          <Text fontSize="16px" style={{ textAlign: 'center' }}>
            {t(`JETS holders will earn all the Refined Fuel produced from the 1% FUEL transfer tax`)}
          </Text>
          <Text fontSize="16px" style={{ textAlign: 'center' }}>
            {t(`There is a 2.5% withdraw fee when converting from JETS to FUEL`)}
          </Text>
        </TipsCard>
      </StyledContainer>
    </Background>
  )
}

export default Jets
