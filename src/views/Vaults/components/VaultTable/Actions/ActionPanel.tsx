import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text } from 'jetswap-uikit-new'
import { VaultWithStakedValue } from 'views/Vaults/components/VaultCard/VaultCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityVaults } from 'config/constants'
import { CommunityTag, CoreTag, DualTag } from 'components/Tags'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
// import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  apr: AprProps
  // multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: VaultWithStakedValue
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, apr, liquidity }) => {
  const vault = details

  const { t } = useTranslation()
  const { quoteToken, token, dual } = vault
  const lpLabel = vault.lpSymbol && vault.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAdresses: quoteToken.address,
    tokenAddresses: token.address,
  })

  const lpAddress = vault.isSingle
    ? vault.token.address[process.env.REACT_APP_CHAIN_ID]
    : vault.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  let exchangeLink = vault.isSingle
    ? `https://exchange.jetswap.finance/#/swap?outputCurrency=${lpAddress}`
    : `https://exchange.jetswap.finance/#/add/${liquidityUrlPathParts}`

  const bsc = `https://bscscan.com/address/${lpAddress}`
  let info = `https://info.jetswap.finance/${vault.isSingle ? 'token' : 'pair'}/${lpAddress}`
  const isCommunityVault = communityVaults.includes(token.symbol)

  if (vault.provider === 'Pancake') {
    exchangeLink = vault.isSingle
      ? `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${lpAddress}`
      : `https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`

    info = `https://pancakeswap.info/${vault.isSingle ? 'token' : 'pair'}/${lpAddress}`
  } else if (vault.provider === 'Apeswap') {
    exchangeLink = vault.isSingle
      ? `https://dex.apeswap.finance/#/swap?outputCurrency=${lpAddress}`
      : `https://dex.apeswap.finance/#/add/${liquidityUrlPathParts}`

    info = `https://info.apeswap.finance/${vault.isSingle ? 'token' : 'pair'}/${lpAddress}`
  } else if (vault.provider === 'Venus') {
    exchangeLink = vault.isSingle
      ? `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${lpAddress}`
      : `https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`
    info = `https://app.venus.io/market/${vault.lpSymbol}`
  } else if (vault.provider === 'Fortress') {
    exchangeLink = vault.isSingle
      ? `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${lpAddress}`
      : `https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`
    info = `https://bsc.fortress.loans/market/${vault.lpSymbol}`
  } else if (vault.provider === 'autofarm') {
    exchangeLink = vault.isSingle
      ? `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${lpAddress}`
      : `https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`

    info = `https://pancakeswap.info/${vault.isSingle ? 'token' : 'pair'}/${lpAddress}`
  }

  return (
    <Container>
      <InfoContainer>
        <StakeContainer>
          <StyledLinkExternal href={exchangeLink}>{t(`Get %symbol%`, { symbol: lpLabel })}</StyledLinkExternal>
        </StakeContainer>
        <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={info}>{vault.isSingle ? t('See Token Info') : t('See Pair Info')}</StyledLinkExternal>
        <TagsContainer>
          {isCommunityVault ? <CommunityTag /> : <CoreTag provider={vault.provider} />}
          {dual ? <DualTag /> : null}
        </TagsContainer>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text>{t('APY')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        {/* <ValueWrapper>
          <Text>{t('Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper> */}
        <ValueWrapper>
          <Text>{t('Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction {...vault} />
        <StakedAction {...vault} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
