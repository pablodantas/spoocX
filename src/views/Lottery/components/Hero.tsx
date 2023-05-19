import React from 'react'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { Heading, Text } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div<StyledHeroProps>`
  background-color: ${(props) => (props.mode ? '#3F3F3F' : '#FFF')};
  padding-bottom: 40px;
  padding-top: 40px;
`

const StyledContainer = styled(Container)`
  display: flex;

  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

interface StyledHeroProps {
  mode: boolean
}

const Hero = () => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  return (
    <StyledHero mode={isDark}>
      <StyledContainer>
        <LeftWrapper>
          <Title>{t('The WINGS Lottery')}</Title>
          <Blurb>{t('Buy tickets with WINGS')}</Blurb>
          <Blurb>{t('Win if 2, 3 or 4 of your ticket numbers match!')}</Blurb>
        </LeftWrapper>
        <RightWrapper>
          <LotteryProgress />
        </RightWrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
