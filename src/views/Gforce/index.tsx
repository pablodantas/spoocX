import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, Heading, Flex, Text, Button } from 'jetswap-uikit-new'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getGfceV2Address } from 'utils/addressHelpers'
import { getGfceV1Contract, getGfceV2Contract } from 'utils/contractHelpers'
import { useGfceV1Contract, useGfceV2Contract } from 'hooks/useContract'
import { BigNumber } from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import { usePriceGFCEBusd } from 'state/hooks'
import Balance from 'components/Balance'
import Container from 'components/layout/Container'
import Hero from './components/Hero'

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
  padding: 25px 35px;
  max-width: 492px;
  width: 100%;
  border-radius: 20px;
  box-shadow: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :first-child {
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
    :first-child {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
`

const StyledCardInfo = styled(Flex)`
  display: flex;
  flex-direction: column;
  padding: 18px 0;
  justify-content: space-between;
  align-items: flex-start;
`

const Name = styled(Text)`
  text-align: left;
  margin-left: 9px;
  font-size: 18px;
  font-weight: 500;
`

const Description = styled(Heading).attrs({ as: 'h2', size: 'lg' })`
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ConvertCard = styled(Card)`
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.card : '#F1F1F1')};
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 0;
  width: 100%;
  border-radius: 20px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 0;
  }
`

const ConvertHeader = styled.div`
  padding: 30px 40px;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? '#2A2A2A' : '#FAF9FA')};
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`

const ConvertBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  @media (max-width: 768px) {
    padding: 20px 20px;
    & > div:nth-child(1) {
      order: 1;
    }
    & > div:nth-child(2) {
      order: 3;
    }
    & > div:nth-child(3) {
      order: 2;
    }
  }
`

const GforceBalance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
`

const InfoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 0;
  width: 100%;
  border-radius: 20px;
  box-shadow: none;
  justify-content: center;
  /* margin-bottom: 20px; */
  @media (max-width: 768px) {
    padding: 0;
  }
`

const InfoHeader = styled.div`
  padding: 30px 40px;
  border-bottom: 1px solid ${({ theme }) => (theme.isDark ? '#2A2A2A' : '#FAF9FA')};
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`

const InfoBody = styled.div`
  padding: 30px 40px;
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border: 0.5px solid #c0c0c0;
  box-sizing: border-box;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.input};
  padding: 10px 10px 10px 20px;
  flex: 1;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

const StyledInput = styled.input`
  width: 100%;
  flex: 1;
  background: transparent;
  background-color: transparent;
  border: none;
  font-size: 24px;
  margin-right: 20px;
  color: ${({ theme }) => theme.colors.text};
  :focus-visible {
    background-color: transparent;
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

const ConvertBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 9px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`

const StyledButton = styled(Button)`
  width: 240px;
  font-weight: bold;
  font-size: 19px;
  text-align: right;
  text-transform: capitalize;
  color: #2a2a2a;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 30px;
`

const Note = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.text : '#929292')};
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`

const useBalances = () => {
  const { account } = useWeb3React()
  const [refresh, setRefresh] = useState(1)
  const { fastRefresh } = useRefresh()

  const [data, setData] = useState({
    gfceV1Balance: new BigNumber(0),
    gfceV2Balance: new BigNumber(0),
    gfceV2TotalSupply: new BigNumber(0),
    allowance: new BigNumber(0),
  })

  const checkTotalStakedStatus = useCallback(() => {
    setRefresh((prevRefresh) => prevRefresh + 1)
  }, [setRefresh])

  useEffect(() => {
    const fetch = async () => {
      try {
        const gfceV1Contract = getGfceV1Contract()
        const gfceV2Contract = getGfceV2Contract()

        if (account) {
          const [gfceV1Balance, gfceV2Balance, gfceV2TotalSupply, allowance] = await Promise.all([
            gfceV1Contract.methods.balanceOf(account).call(),
            gfceV2Contract.methods.balanceOf(account).call(),
            gfceV2Contract.methods.totalSupply().call(),
            gfceV1Contract.methods.allowance(account, getGfceV2Address()).call(),
          ])

          setData((prevState) => ({
            ...prevState,
            gfceV1Balance: new BigNumber(gfceV1Balance),
            gfceV2Balance: new BigNumber(gfceV2Balance),
            gfceV2TotalSupply: new BigNumber(gfceV2TotalSupply),
            allowance: new BigNumber(allowance),
          }))
        } else {
          const [gfceV2TotalSupply] = await Promise.all([gfceV1Contract.methods.totalSupply().call()])
          setData((prevState) => ({
            ...prevState,
            gfceV2TotalSupply: new BigNumber(gfceV2TotalSupply),
          }))
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetch()
  }, [fastRefresh, refresh, account, checkTotalStakedStatus])

  return { ...data, account, checkTotalStakedStatus }
}

const Gforce: React.FC = () => {
  const { t } = useTranslation()
  const usdPrice = usePriceGFCEBusd()

  const { account, gfceV1Balance, gfceV2Balance, gfceV2TotalSupply, allowance } = useBalances()

  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedBuy] = useState(false)
  const [convertAmount, setConvertAmount] = useState(0)

  const onMax = () => {
    setConvertAmount(getBalanceNumber(gfceV1Balance, 9))
  }

  const gfceV2Contract = useGfceV2Contract()
  const onConvert = useCallback(async () => {
    if (!account) {
      return
    }

    try {
      setRequestedBuy(true)

      const txHash = await gfceV2Contract.methods
        .convertV1ToV2(new BigNumber(convertAmount).times(new BigNumber(10).pow(9)).toString())
        .send({ from: account })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [account, gfceV2Contract, convertAmount, setRequestedBuy])

  const gfceV1Contract = useGfceV1Contract()
  const onApprove = useCallback(async () => {
    if (!account) {
      return
    }

    try {
      setRequestedBuy(true)

      const txHash = await gfceV1Contract.methods
        .approve(getGfceV2Address(), new BigNumber(2).pow(256).minus(1).toString(10))
        .send({ from: account })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [account, gfceV1Contract, setRequestedBuy])

  return (
    <Background>
      <Hero />
      <StyledContainer>
        <CardsWrapper>
          <StyledCard>
            <StyledCardInfo alignItems="center">
              <CardTitle>
                <img src="/images/assets/gforce1.svg" alt="gforce1" width="24px" />
                <Name>{t(`GFORCE Supply`)}</Name>
              </CardTitle>
              <Description>
                <Balance fontSize="28px" value={getBalanceNumber(gfceV2TotalSupply, 9)} decimals={0} />
              </Description>
            </StyledCardInfo>
            <img src="/images/assets/gforce2.svg" alt="jets1" width="150px" />
          </StyledCard>
          <StyledCard>
            <StyledCardInfo alignItems="center">
              <CardTitle>
                <img src="/images/assets/gforce3.svg" alt="gforce1" width="24px" />
                <Name>{t(`GFORCE Price`)}</Name>
              </CardTitle>
              <Description style={{ fontSize: '28px' }}>
                $<Balance fontSize="28px" value={getBalanceNumber(usdPrice, 0)} decimals={2} />
              </Description>
            </StyledCardInfo>
          </StyledCard>
        </CardsWrapper>

        <ConvertCard>
          <ConvertHeader>
            <Note fontSize="18px">{t(`Note`)}</Note>
            <Text fontSize="22px" bold>
              {t(`Please upgrade GFCE V1 to GFCE V2.`)}
            </Text>
          </ConvertHeader>
          <ConvertBody>
            <GforceBalance>
              <Text fontSize="18px" bold>
                GFCE V1 {t(`Balance`)}:&nbsp;
              </Text>
              <Balance
                fontSize="18px"
                value={account ? getBalanceNumber(gfceV1Balance, 9) : 0}
                decimals={!account || !gfceV1Balance.gt(0) ? 1 : 5}
              />
            </GforceBalance>
            <ConvertBtnWrapper>
              <InputWrapper>
                <StyledInput
                  type="number"
                  min="0"
                  value={convertAmount}
                  onChange={(e) => {
                    setConvertAmount(Number(e.target.value))
                  }}
                />
                <Text style={{ marginRight: '20px' }} bold>
                  GFCE V1
                </Text>
                <Button
                  style={{ color: '#2A2A2A', height: '42px' }}
                  onClick={() => {
                    onMax()
                  }}
                >
                  {t(`Max`)}
                </Button>
              </InputWrapper>
              {allowance.lt(new BigNumber(convertAmount).times(new BigNumber(10).pow(9))) ? (
                <StyledButton
                  disabled={pendingTx || convertAmount <= 0}
                  onClick={async () => {
                    setPendingTx(true)
                    await onApprove()
                    setPendingTx(false)
                  }}
                >
                  {pendingTx ? t('Pending...') : t(`Approve`)}
                </StyledButton>
              ) : (
                <StyledButton
                  disabled={pendingTx || convertAmount <= 0 || convertAmount > getBalanceNumber(gfceV1Balance, 9)}
                  onClick={async () => {
                    setPendingTx(true)
                    await onConvert()
                    setPendingTx(false)
                  }}
                >
                  {pendingTx ? t('Pending...') : t(`Convert`)}
                </StyledButton>
              )}
            </ConvertBtnWrapper>
            <GforceBalance>
              <Text fontSize="18px" bold>
                GFCE V2 {t(`Balance`)}:&nbsp;
              </Text>
              <Balance
                fontSize="18px"
                value={account ? getBalanceNumber(gfceV2Balance, 9) : 0}
                decimals={!account || !gfceV2Balance.gt(0) ? 1 : 5}
              />
            </GforceBalance>
          </ConvertBody>
        </ConvertCard>

        <InfoCard>
          <InfoHeader>
            <Text fontSize="24px" bold style={{ lineHeight: '1' }}>
              {t(`Info`)}
            </Text>
          </InfoHeader>
          <InfoBody>
            <Text fontSize="18px" bold>
              {t(`GFORCE Passive Yield`)}
            </Text>
            <Text fontSize="16px">
              -&nbsp;
              {t(`Every GFCE transaction is taxed 3% and is instantly & passively distributed to all GFORCE holders.`)}
            </Text>
            <Text fontSize="16px">
              -&nbsp;{t(`Single staking GFCE for WINGS is exempt from the passive yield generation.`)}
            </Text>

            <Text fontSize="18px" bold style={{ marginTop: '20px' }}>
              {t(`GFORCE Automatic Liquidity (PAUSED UNTIL MIGRATION FROM GFCE V1 TO V2 IS COMPLETED)`)}
            </Text>
            <Text fontSize="16px">-&nbsp;{t(`3% of each transaction is taxed to build liquidity.`)}</Text>
            <Text fontSize="16px">
              -&nbsp;{t(`The automatic liquidity function is called once 100 GFCE is collected from the 3% fee.`)}
            </Text>

            <Text fontSize="18px" bold style={{ marginTop: '20px' }}>
              {t(`GFORCE Whitelisted Feature`)}
            </Text>
            <Text fontSize="16px">
              -&nbsp;
              {t(
                `GFCE V2 includes the ability to remove the transactional fee on both the sending from the whitelisted address and removes the fees when GFCE is sent to the whitelisted address. This allows for single staking GFCE.`,
              )}
            </Text>
          </InfoBody>
        </InfoCard>
      </StyledContainer>
    </Background>
  )
}

export default Gforce
