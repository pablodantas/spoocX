import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon } from 'jetswap-uikit-new'
import { useTranslation } from 'contexts/Localization'

const CoreTag = (props) => {
  const { t } = useTranslation()
  const { provider } = props
  return (
    <Tag variant="textSubtle" outline startIcon={<VerifiedIcon />} {...props}>
      {provider ?? t('Core')}
    </Tag>
  )
}

const CommunityTag = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="textSubtle" outline startIcon={<CommunityIcon />} {...props}>
      {t('Community')}
    </Tag>
  )
}

const BinanceTag = (props) => (
  <Tag variant="binance" outline startIcon={<BinanceIcon />} {...props}>
    Binance
  </Tag>
)

const DualTag = (props) => (
  <Tag variant="textSubtle" outline {...props}>
    Dual
  </Tag>
)

export { CoreTag, CommunityTag, BinanceTag, DualTag }
