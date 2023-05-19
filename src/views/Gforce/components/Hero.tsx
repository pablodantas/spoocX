import React from 'react'
import styled from 'styled-components'
import { Heading } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'
import JetGforce from './JetGforce'

const StyledHero = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 32px 0px;
  margin-bottom: 32px;

  display: block;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 0 0 8.5%;
    min-height: 190px;
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
    justify-content: center;
  }
`

const Container2 = styled.div`
  display: flex;
  justify-content: center;
`

const Hero = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <div>
        <Heading as="h1" size="xxl" color="secondary" mb="24px">
          {t('GForce')}
        </Heading>
        <Heading size="lg" color="text">
          {t(
            'Gforce is an innovative token in the Jetfuel.Finance Ecosystem that is revolutionizing the passive yield and staking token landscape.',
          )}
        </Heading>
      </div>
      <Container2>
        <JetGforce />
      </Container2>
    </StyledHero>
  )
}

export default Hero
