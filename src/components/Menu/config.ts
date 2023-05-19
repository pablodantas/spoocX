import { MenuEntry } from 'jetswap-uikit-new'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: 'https://exchange.jetswap.finance/#/swap',
      },
      {
        label: t('Liquidity'),
        href: 'https://exchange.jetswap.finance/#/pool',
      },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('Vaults'),
    icon: 'VaultIcon',
    href: '/vaults',
  },
  {
    label: t('Lottery'),
    icon: 'TicketIcon',
    href: '/lottery',
  },
  // {
  //   label: t('Lottery'),
  //   icon: 'DiceIcon',
  //   items: [
  //     {
  //       label: t('Dice Game'),
  //       href: '/dice'
  //     },
  //   ]
  // },
  // {
  //   label: 'Collectibles',
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: '/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: '/profile',
  //     },
  //   ],
  // },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Overview'),
        href: 'https://info.jetswap.finance/home',
        target: '_blank',
      },
      {
        label: t('Tokens'),
        href: 'https://info.jetswap.finance/tokens',
        target: '_blank',
      },
      {
        label: t('Pairs'),
        href: 'https://info.jetswap.finance/pairs',
        target: '_blank',
      },
      {
        label: t('Accounts'),
        href: 'https://info.jetswap.finance/accounts',
        target: '_blank',
      },
    ],
  },
  {
    label: 'IJO',
    icon: 'IfoIcon',
    href: '/ijo',
  },
  {
    label: 'JETS',
    icon: 'JetsIcon',
    href: '/jets',
  },
  {
    label: t('Gforce'),
    icon: 'GforceIcon',
    items: [
      {
        label: 'Gforce',
        href: '/gforce',
      },
    ],
  },
  {
    label: t('Partnership'),
    icon: 'PartnerIcon',
    items: [
      {
        label: t('IJO'),
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSfAjZ2tZWdLjjw73u4DHjQHKtoydlU-K1kzPpGYzXFRUenf9Q/viewform',
        target: '_blank',
      },
      {
        label: t('Token Application'),
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSffJ4g7bhAUJIw9tDCqM8kaVLAFso9vQmk_vxiEHryXbTP6Jw/viewform',
        target: '_blank',
      },
      {
        label: t('Farm Application'),
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSeuSSnBvJ0ZP6de1ALabhWdVSBv34gi7PfPULgSzrT3GUBNCw/viewform',
        target: '_blank',
      },
    ],
  },
  {
    label: t('Audit'),
    icon: 'AuditIcon',
    items: [
      {
        label: t('Audit by EtherAuthority'),
        href: 'https://jetswap.finance/audit-by-etherauthority.pdf',
        target: '_blank',
      },
      {
        label: t('Audit by Hash0x'),
        href: 'https://jetswap.finance/audit-by-hash0x.pdf',
        target: '_blank',
      },
    ],
  },
  {
    label: t('Games'),
    icon: 'DiceIcon',
    items: [
      {
        label: t('Coin Flip'),
        href: '/coin-flip',
      },
      {
        label: t('Barbell Roll'),
        href: '/barbell-roll',
      },
      {
        label: t('Roulette'),
        href: '/roulette',
      },
      {
        label: t('Dice It'),
        href: '/dice-it',
      },
    ],
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Docs'),
        href: 'https://docs.jetswap.finance',
        target: '_blank',
      },
      {
        label: t('Blog'),
        href: 'https://jetfuelfinance.medium.com/',
        target: '_blank',
      },
      {
        label: t('Vote'),
        href: 'https://vote.jetswap.finance/',
        target: '_blank',
      },
      {
        label: t('Jetfuel Finance'),
        href: 'https://jetfuel.finance',
        target: '_blank',
      },
      {
        label: t('Fortress'),
        href: 'https://fortress.loans',
        target: '_blank',
      },
      {
        label: t('Gforce'),
        href: 'https://jetfuel.finance/gforce',
        target: '_blank',
      },
    ],
  },
]

export default config
