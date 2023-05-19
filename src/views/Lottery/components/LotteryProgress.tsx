import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Text, Progress } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { useLotteryInfo } from 'hooks/useLotteryData'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// const BottomTextWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   text-align: center;
// `

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
`
const LotteryProgress = () => {
  const { t } = useTranslation()

  const [progress, setProgress] = useState(0)
  const [timeAlarm, setTimeAlarm] = useState('')
  const [noteAlarm, setNoteAlarm] = useState('')
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)
  const lotteryInfo = useLotteryInfo(currentLotteryNumber)

  useEffect(() => {
    if (lotteryInfo) {
      const currentTimestamp = moment().unix()
      if (currentTimestamp >= lotteryInfo.closingTimestamp) {
        setProgress(0)
        if (lotteryInfo.lotteryStatus < 3) setNoteAlarm('Winning numbers will be drawn soon')
        else setNoteAlarm('On sale soon')
        setTimeAlarm('')
      } else if (currentTimestamp < lotteryInfo.startingTimestamp) {
        const timeLeft = lotteryInfo.startingTimestamp - currentTimestamp
        setProgress(0)
        const hourLeft = Math.floor(timeLeft / 3600)
        const minuteLeft = Math.ceil((timeLeft - hourLeft * 3600) / 60)

        if (hourLeft === 0) setTimeAlarm(`${minuteLeft}m`)
        else setTimeAlarm(`${hourLeft}h, ${minuteLeft}m`)
        setNoteAlarm('Until ticket sale')
      } else {
        const timeLenght = lotteryInfo.closingTimestamp - lotteryInfo.startingTimestamp
        const timeLeft = lotteryInfo.closingTimestamp - currentTimestamp
        setProgress((timeLeft / timeLenght) * 100)
        const hourLeft = Math.floor(timeLeft / 3600)
        const minuteLeft = Math.ceil((timeLeft - hourLeft * 3600) / 60)
        if (hourLeft === 0) setTimeAlarm(`${minuteLeft}m`)
        else setTimeAlarm(`${hourLeft}h, ${minuteLeft}m`)

        setNoteAlarm('Until lottery draw')
      }
    } else {
      setNoteAlarm(`On sale soon`)
      setTimeAlarm('')
    }
  }, [lotteryInfo])

  return (
    <ProgressWrapper>
      <Progress primaryStep={progress} secondaryStep={0} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold>
          {timeAlarm}
        </StyledPrimaryText>
        <Text fontSize="20px" bold>
          {t(noteAlarm)}
        </Text>
      </TopTextWrapper>
      {/* {lotteryHasDrawn && (
        <BottomTextWrapper>
          <Text color="textDisabled">
            {timeUntilLotteryDraw} {t('Until lottery draw')}
          </Text>
        </BottomTextWrapper>
      )} */}
    </ProgressWrapper>
  )
}

export default LotteryProgress
