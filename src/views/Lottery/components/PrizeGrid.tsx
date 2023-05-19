import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Heading, Text } from 'jetswap-uikit-new'

export interface PrizeGridProps {
  twoMatchesAmount?: number
  threeMatchesAmount?: number
  fourMatchesAmount?: number
  burnAmount?: number
  pastDraw?: boolean
  jackpotMatches?: number
  oneTicketMatches?: number
  twoTicketMatches?: number
  threeTicketMatches?: number
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 3 : 2)}, 1fr);
  grid-template-rows: repeat(4, auto);
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const RightAlignedHeading = styled(Heading)`
  text-align: right;
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`

const PrizeGrid: React.FC<PrizeGridProps> = ({
  twoMatchesAmount = 0,
  threeMatchesAmount = 0,
  fourMatchesAmount = 0,
  burnAmount = 0,
  pastDraw = false,
  jackpotMatches,
  twoTicketMatches,
  threeTicketMatches,
}) => {
  const { t } = useTranslation()

  return (
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="14px" color="textSubtle">
          {t('No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="14px" color="textSubtle">
            {t('Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="14px" color="textSubtle">
          {t('Prize Pot')}
        </RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Heading size="md">4</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading size="md">{jackpotMatches}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="md">{fourMatchesAmount.toLocaleString()}</RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <Text bold>3</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText bold>{threeTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>{threeMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem>
        <Text>2</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText>{twoTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>{twoMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0">
        <Text>{t(`${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText>{burnAmount.toLocaleString()}</RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText>{burnAmount.toLocaleString()}</RightAlignedText>
        </GridItem>
      )}
    </Grid>
  )
}

export default PrizeGrid
