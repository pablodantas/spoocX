import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 3,
    lpSymbol: 'TESTE-PABRO LP',
    lpAddresses: {
      97: '',
      56: '0x1CD0fe829d83Fb49c8831Ae860d19c6062adA6e9',
    },
    token: tokens.wings,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'WINGS-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xFBa740304f3fc39d0e79703a5D7788E13f877DC0',
    },
    token: tokens.wings,
    quoteToken: tokens.busd,
  },
  {
    pid: 5,
    lpSymbol: 'FUEL-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xFD6583Aea0978158349d45740d1B1BC2bC223391',
    },
    token: tokens.fuel,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'FTS-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xbd22832367bcb71b8d2030cf3110ec2f9b63a240',
    },
    token: tokens.fts,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 16,
    lpSymbol: 'GFCEv2-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7BFc36EA42907B5BFC951639259F0aeD71Ffe9Fe',
    },
    token: tokens.gfcev2,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc53eE6446101F2128f887b8c75083E74dca3e973',
    },
    token: tokens.wbnb,
    quoteToken: tokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xB3D117C8cC60Abd83F0d946d85f3B67c972196dd',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
  },
  {
    pid: 19,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xA70D288fFd1A7A273b6cC3a553ef7562c1798a48',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 20,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xa6f994424B8a674A76273097050DE1fdCdbf9f0F',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 11,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xc3C16CaE0cf35615b8716a9A8BB0b1257CdbCA53',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 12,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x877e9c2CE598702fBcfF77c7F91b5BFD9BD0200A',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 13,
    lpSymbol: 'BHC-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x3751E051e39b342451e8C26C6eb0B48Fe394e885',
    },
    token: tokens.bhc,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 14,
    lpSymbol: 'TRYON-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xb556c411fb9dbd9e178abf8061544b28b5578e6b',
    },
    token: tokens.tryon,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 17,
    lpSymbol: 'BNB-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x38153dAE67B364DC2639717b5458461598762E0a',
    },
    token: tokens.usdt,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 18,
    lpSymbol: 'BNB-USDC LP',
    lpAddresses: {
      97: '',
      56: '0x4b56EE85949164519bBa2e454269dE156930a4C8',
    },
    token: tokens.usdc,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 21,
    lpSymbol: 'WATCH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0Ff00061Ce19175eED18676F293C3db76e22F805',
    },
    token: tokens.watch,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 22,
    lpSymbol: 'AUTO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xeA3D46e1360dA830c72A1429F0bB2c90beAaE2aA',
    },
    token: tokens.auto,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 23,
    lpSymbol: 'xBLZD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xE5C3C6171aF42E4C5A7778ccdc2B75DcC374fDfc',
    },
    token: tokens.xblzd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 24,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x5a918dEcB4FC88cE5C2f54eca3d4EA6fcb259AFc',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 25,
    lpSymbol: 'LORY-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xebcfa8b0f8f2e04542be9333567cb2c87c21130e',
    },
    token: tokens.lory,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 26,
    lpSymbol: 'OGMN-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x4e4E951801b8bd1e6e581bf5BcA3153423C05880',
    },
    token: tokens.ogmn,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 27,
    lpSymbol: 'TUSK-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xD90E8571BF129515E1f8894430482AC0A96d8316',
    },
    token: tokens.tusk,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 28,
    lpSymbol: 'DEP-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x457496c9FDc860a8b9a31BF2ff4fD297f9BA1CB7',
    },
    token: tokens.dep,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 29,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x5165C82912b8EF4053770a9e488D5FE81A6e730E',
    },
    token: tokens.ada,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 30,
    lpSymbol: 'DOGE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x302DbdACD7BCDCf288bd6342F9ffa5F31E8E6744',
    },
    token: tokens.doge,
    quoteToken: tokens.wbnb,
  },
]

export default farms
