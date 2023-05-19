import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'

const HowItWorks2: React.FC = () => {
  const { t } = useTranslation()

  return (
    <CardWrapper>
      <Card>
        <CardBody>
          <StyledCardContentInner>
            <StyledCardHeader>
              <Title>{t('How It Works')}</Title>
              <br />
            </StyledCardHeader>
            <Column>
              <div>
                {t(
                  'Spend WINGS to buy tickets, contributing to the lottery pot. Win prizes if 2, 3 or 4 of your ticket numbers match the winning numbers and their exact order!',
                )}
              </div>
            </Column>
            <Link
              href="https://docs.jetswap.finance/exchange-information/lottery"
              target="_blank"
              style={{ color: '#FECC13' }}
            >
              {t('Read More')}
            </Link>
          </StyledCardContentInner>
        </CardBody>
      </Card>
    </CardWrapper>
  )
}
const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  color: #25beca;
`
const Column = styled.div`
  margin-top: 1em;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div`
  margin-top: 20px;
`

const Title = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default HowItWorks2
