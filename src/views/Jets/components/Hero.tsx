import React from 'react'
import styled from 'styled-components'
import { Heading } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'

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
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
  }
`
const Hero = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <div>
        <Heading as="h1" size="xxl" color="secondary" mb="24px">
          {t('Staking FUEL')}
        </Heading>
        <Heading size="lg" color="text">
          {t('Welcome to the Hangar. You can convert your FUEL into JETS to earn more FUEL.')}
        </Heading>
      </div>
    </StyledHero>
  )
}

export default Hero
