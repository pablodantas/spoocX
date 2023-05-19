import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: linear-gradient(90deg, #fec803 0%, #63e2ff 50%, #6562f5 100%);
`

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  text-align: center;
  margin: 16px 0;
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`

const UnlockWalletCard = () => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <StyledCardBody>
        <IconWrapper>
          <img src="/images/assets/ticket.svg" alt="ticket" width="96" />
        </IconWrapper>
        <StyledHeading size="md">
          {t('Unlock wallet to')}
          <br />
          {t('access lottery')}
        </StyledHeading>
        <UnlockButton />
      </StyledCardBody>
    </StyledCard>
  )
}

export default UnlockWalletCard
