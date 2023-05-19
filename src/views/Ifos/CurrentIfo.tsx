import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image, Card } from 'jetswap-uikit-new'
import { ifosConfig } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid #e9e9e9;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 17px;
  margin-bottom: 30px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 105.5%;
`

const GuideCard = styled.div`
  background: transparent;
  margin-left: auto;
  margin-right: auto;
  max-width: 491px;
  max-height: 570px;
  border-radius: 20px;
  padding: 30px 91px 49px 50px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

const StyledTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 33px;
`

const StyledHeading = styled(Heading)`
  font-size: 17px;
  margin-bottom: 20px;
`

const Description = styled.span`
  margin-left: 5px;
  display: inline-block;
  font-size: 17px;
`

const Airplane = styled(Card)`
  max-width: 488px;
  max-height: 211px;
  background-image: url('/images/ifo-bg.svg');
  padding-top: 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 200px;
    padding-top: 50px;
  }
`

const Frame = styled(Card)`
  width: 100px;
  height: 71px;
  background-image: url('/images/ifo-frame.svg');
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 96px;
  right: 42px;

  @media (max-width: 768px) {
    top: 110px;
    transform: scale(0.7);
  }
`

const ZIndexImage = styled(Image)`
  z-index: 1000;

  @media (max-width: 768px) {
    width: 300px;
  }
`

const LaunchCard = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 491px;
  max-height: 335px;
  border-radius: 20px;
  padding: 30px 91px 49px 50px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

const StyledButton = styled(Button).attrs({
  as: 'a',
  variant: 'secondary',
  href: 'https://docs.jetswap.finance/exchange-information/initial-jetfuel-offerings-ijos',
})`
  color: ${({ theme }) => theme.colors.text};
  border: ${({ theme }) => `1px solid ${theme.colors.text}`};
  width: 211px;
  padding: 10px 60px;
  border-radius: 10px;
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const { t } = useTranslation()

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <GuideCard>
          <StyledTitle as="h2">{t('How to take part')}</StyledTitle>
          <StyledHeading as="h1">{t('Before Sale')}:</StyledHeading>
          <List>
            <Description>{t('Buy WINGS and BNB tokens')}</Description>
          </List>
          <StyledHeading>{t('During Sale')}:</StyledHeading>
          <List>
            <Description>{t('Get WINGS-BNB LP tokens by adding WINGS and BNB liquidity')}</Description>
          </List>
          <StyledHeading>{t('After Sale')}:</StyledHeading>
          <List>
            <Description style={{ marginBottom: '20px' }}>
              {t('Claim the tokens you bought, along with any unspent funds.')}
            </Description>
            <Description>{t('Done!')}</Description>
          </List>
          <Text as="div" pt="16px">
            <StyledButton
            // as="a"
            // variant="secondary"
            // href="https://docs.pancakeswap.finance/core-products/ifo-initial-farm-offering"
            >
              {t('Read more')}
            </StyledButton>
          </Text>
        </GuideCard>
        <div>
          <Airplane>
            <ZIndexImage src="/images/ifo-airplane.svg" alt="Number 1" width={400} height={150} responsive />
            <Frame />
          </Airplane>
          <LaunchCard>
            <StyledTitle as="h2">{t('Want to launch your own IJO?')}</StyledTitle>
            <Text mb={4} fontSize="17px">
              {t(
                'Launch your project with JetSwap, Binance Smart Chain’s most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on BSC.',
              )}
            </Text>
            <Button
              as="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfAjZ2tZWdLjjw73u4DHjQHKtoydlU-K1kzPpGYzXFRUenf9Q/viewform"
              external
            >
              {t('Apply to launch')}
            </Button>
          </LaunchCard>
        </div>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
