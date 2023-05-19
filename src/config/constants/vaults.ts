import tokens from './tokens'
import { VaultConfig } from './types'

const vaults: VaultConfig[] = [
  {
    pid: 3,
    lpSymbol: 'WINGS-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x1CD0fe829d83Fb49c8831Ae860d19c6062adA6e9',
    },
    vaultAddresses: {
      97: '',
      56: '0x465A5e8501Bf38898A8AeAd87f0d864AdCc826a4',
    },
    strategyAddresses: {
      97: '',
      56: '0xAD74C817Ca4b1c302baE6FcDFa743709E07cbAe8',
    },
    token: tokens.wings,
    quoteToken: tokens.wbnb,
    provider: 'Jetswap',
  },
  {
    pid: 4,
    lpSymbol: 'WINGS-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xFBa740304f3fc39d0e79703a5D7788E13f877DC0',
    },
    vaultAddresses: {
      97: '',
      56: '0xED2097330741aC6AA574C0EDa26A7ad41c976fb0',
    },
    strategyAddresses: {
      97: '',
      56: '0x5D9EBDe919f6ee1a37263EE9d7bBdC5821707ad8',
    },
    token: tokens.wings,
    quoteToken: tokens.busd,
    provider: 'Jetswap',
  },
  {
    pid: 0,
    lpSymbol: 'WINGS',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xFBa740304f3fc39d0e79703a5D7788E13f877DC0',
    },
    vaultAddresses: {
      97: '',
      56: '0x184BA48939c49f54b0aa31F76177ebA40130b7BA',
    },
    strategyAddresses: {
      97: '',
      56: '0xf150Fd19a8f88668099eaB23291162124F24E06f',
    },
    token: tokens.wings,
    quoteToken: tokens.wings,
    provider: 'Jetswap',
  },
  {
    pid: 5,
    lpSymbol: 'FUEL-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xFD6583Aea0978158349d45740d1B1BC2bC223391',
    },
    vaultAddresses: {
      97: '',
      56: '0x755aAC39603599D2a10C407C3D06deE96999Ae90',
    },
    strategyAddresses: {
      97: '',
      56: '0xa22DbbA46780fF55eba4662393D9a17568F2e0b6',
    },
    token: tokens.fuel,
    quoteToken: tokens.wbnb,
    provider: 'Jetswap',
  },
  {
    pid: 6,
    lpSymbol: 'FTS-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xbd22832367bcb71b8d2030cf3110ec2f9b63a240',
    },
    vaultAddresses: {
      97: '',
      56: '0xD0B1DC1B39A730D634902c01C61316A97afA31B5',
    },
    strategyAddresses: {
      97: '',
      56: '0x70Ed4836E746547fB0e910aCE95fa545CB9D8A30',
    },
    token: tokens.fts,
    quoteToken: tokens.wbnb,
    provider: 'Jetswap',
  },
  {
    pid: 16,
    lpSymbol: 'GFCEv2-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7BFc36EA42907B5BFC951639259F0aeD71Ffe9Fe',
    },
    vaultAddresses: {
      97: '',
      56: '0xF2F11389cE9cf23c37B03131Df914772BA17e664',
    },
    strategyAddresses: {
      97: '',
      56: '0xD962D17807693b1Cd32ec76d811f1dC8E184f3C8',
    },
    token: tokens.gfcev2,
    quoteToken: tokens.wbnb,
    provider: 'Jetswap',
  },
  {
    pid: 7,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc53eE6446101F2128f887b8c75083E74dca3e973',
    },
    vaultAddresses: {
      97: '',
      56: '0x7F2E9e374E97f171c9eD3E0910111b15B9045644',
    },
    strategyAddresses: {
      97: '',
      56: '0x0d9AB0182A8004014DD22B7b6F614D07d13EeDb6',
    },
    token: tokens.wbnb,
    quoteToken: tokens.busd,
    provider: 'Jetswap',
  },
  {
    pid: 8,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xB3D117C8cC60Abd83F0d946d85f3B67c972196dd',
    },
    vaultAddresses: {
      97: '',
      56: '0x06FD5CaB123990a0dd0Ba2130Bfa76Da26C91b43',
    },
    strategyAddresses: {
      97: '',
      56: '0x24Bb788B3631d833642FD177d6774428BE5a63cE',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
    provider: 'Jetswap',
  },
  {
    pid: 14,
    lpSymbol: 'BNB',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xc53eE6446101F2128f887b8c75083E74dca3e973',
    },
    vaultAddresses: {
      97: '',
      56: '0x15e84D6eD8997590E02b25d3D3CeEe9686753306',
    },
    strategyAddresses: {
      97: '',
      56: '0x58B8B3430c70e76a33E91a6c942078b8f88c506D',
    },
    token: tokens.wbnb,
    quoteToken: tokens.wbnb,
    ftoken: tokens.fbnb,
    provider: 'Fortress',
  },
  {
    pid: 11,
    lpSymbol: 'BTCB',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xc3C16CaE0cf35615b8716a9A8BB0b1257CdbCA53',
    },
    vaultAddresses: {
      97: '',
      56: '0xeaa8234D9bf8Dfc6C8c24D3d24BE3cAd256450EF',
    },
    strategyAddresses: {
      97: '',
      56: '0xE545721E35Ad2Cd9F1616b22509dE643eB0De789',
    },
    token: tokens.btcb,
    quoteToken: tokens.btcb,
    ftoken: tokens.fbtcb,
    provider: 'Fortress',
  },
  {
    pid: 12,
    lpSymbol: 'ETH',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xc3C16CaE0cf35615b8716a9A8BB0b1257CdbCA53',
    },
    vaultAddresses: {
      97: '',
      56: '0x647db6Dce3C36Ac1a3BA48f0F6B767A6c73E22D2',
    },
    strategyAddresses: {
      97: '',
      56: '0xDC012eE194179ceb4f5431015148B0DA1f964E1A',
    },
    token: tokens.eth,
    quoteToken: tokens.eth,
    ftoken: tokens.feth,
    provider: 'Fortress',
  },
  {
    pid: 0,
    lpSymbol: 'CAKE',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xFBa740304f3fc39d0e79703a5D7788E13f877DC0',
    },
    vaultAddresses: {
      97: '',
      56: '0x7c33977171739fbFDb6571512baF257E6f4771f4',
    },
    strategyAddresses: {
      97: '',
      56: '0xDcc5953161D3872F96a560b496419A597231444B',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
    provider: 'Pancake',
  },
  {
    pid: 251,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    vaultAddresses: {
      97: '',
      56: '0x29C12B9cE7df205C944725520718D10aafA78433',
    },
    strategyAddresses: {
      97: '',
      56: '0xd0Fb241B29cf122fD5EAaA856e457e6728181a0c',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 314,
    lpSymbol: 'BEL-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x69DEE989c30b5fFe40867f5FC14F00E4bCE7B681',
    },
    vaultAddresses: {
      97: '',
      56: '0x3e703bDe370fAE75C08b90815E342C7aA578208C',
    },
    strategyAddresses: {
      97: '',
      56: '0x7266cF2770A2E849A5329004Ac52e128Ca7f9902',
    },
    token: tokens.bel,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 275,
    lpSymbol: 'BLINK-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x356Dd24BfF8e23BdE0430f00ad0C290E33438bD7',
    },
    vaultAddresses: {
      97: '',
      56: '0x4e52Ae85329474EC9e2469bdD1d0491EA2C41254',
    },
    strategyAddresses: {
      97: '',
      56: '0x6B8596CF499725E29A56BC9d7b7867d16aD55313',
    },
    token: tokens.blk,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 262,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
    },
    vaultAddresses: {
      97: '',
      56: '0x980edEc0A2a62E3D396A1a60EE8101f5116De316',
    },
    strategyAddresses: {
      97: '',
      56: '0xf08FE1CEbCD8B683a78fbef1F102F8a7728DA9b1',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 252,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    vaultAddresses: {
      97: '',
      56: '0x804ef864d199E28C1F48d179FAeb53683B671875',
    },
    strategyAddresses: {
      97: '',
      56: '0x4E41ddED925bB4a388fa74348E66BCC82A304cB5',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 282,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
    },
    vaultAddresses: {
      97: '',
      56: '0xc573b7E6e7d31Ab2a9A1E64d0a7969495b2169Ff',
    },
    strategyAddresses: {
      97: '',
      56: '0x747b6BBbE0Aaa71bA225C4373a1A79d7770A4338',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
    provider: 'Pancake',
  },
  {
    pid: 277,
    lpSymbol: 'DITTO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x8645148dE4E339964bA480AE3478653b5bc6E211',
    },
    vaultAddresses: {
      97: '',
      56: '0x0350efc06DC9ab70F49dA99Ee46274031dD6c122',
    },
    strategyAddresses: {
      97: '',
      56: '0xA6Fd773FC1AdE5980b2Cdb08643A7409bb0825cC',
    },
    token: tokens.ditto,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 286,
    lpSymbol: 'HELMET-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xC869A9943b702B03770B6A92d2b2d25cf3a3f571',
    },
    vaultAddresses: {
      97: '',
      56: '0xE08677a821259171DfaBC5CCBBeb5bd94B03AE8A',
    },
    strategyAddresses: {
      97: '',
      56: '0xF1ffdb8c5219386780294a55065292Fd41b39958',
    },
    token: tokens.helmet,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 284,
    lpSymbol: 'LTC-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x71b01eBdDD797c8E9E0b003ea2f4FD207fBF46cC',
    },
    vaultAddresses: {
      97: '',
      56: '0xc4F157f1f0Cadf70B9687D5EAf90DEEdEa901b31',
    },
    strategyAddresses: {
      97: '',
      56: '0x75edc51307B3c378028E6d891F4C3D97B5757E5B',
    },
    token: tokens.ltc,
    quoteToken: tokens.wbnb,
    provider: 'Pancake',
  },
  {
    pid: 283,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
    },
    vaultAddresses: {
      97: '',
      56: '0xd1C249dc749E6458813Da36a3dE0Bb4A75cd3104',
    },
    strategyAddresses: {
      97: '',
      56: '0x9aBA196442e4C080bA6Fe055BC124E1F9A3298d0',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
    provider: 'Pancake',
  },
  {
    pid: 293,
    lpSymbol: 'UST-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x05faf555522Fa3F93959F86B41A3808666093210',
    },
    vaultAddresses: {
      97: '',
      56: '0x229eeDacA481A673cd7F318Dffd35489Fdb3c888',
    },
    strategyAddresses: {
      97: '',
      56: '0x5D7E7989ab83914c593219E1fBfbe36D184C9374',
    },
    token: tokens.ust,
    quoteToken: tokens.busd,
    provider: 'Pancake',
  },
  {
    pid: 6,
    lpSymbol: 'AUTO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x4d0228ebeb39f6d2f29ba528e2d15fc9121ead56',
    },
    vaultAddresses: {
      97: '',
      56: '0xa6B4c20A45dF1B47d15c66aF601F5aa599BdbB60',
    },
    strategyAddresses: {
      97: '',
      56: '0x87b7972453D03e344D4fdf8Dd5bef6cA692352f1',
    },
    stratxAddress: {
      97: '',
      56: '0x65168c89a16fbed4e2e418d5245ff626bd66874b',
    },
    token: tokens.auto,
    quoteToken: tokens.wbnb,
    provider: 'autofarm',
  },
  {
    pid: 14,
    lpSymbol: 'BNB',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xc53eE6446101F2128f887b8c75083E74dca3e973',
    },
    vaultAddresses: {
      97: '',
      56: '0xc15bb35A1752A40BE9D5090e784A896074E1cd89',
    },
    strategyAddresses: {
      97: '',
      56: '0x956BcE4F086dC4579B960ED80336Ef79737cDaa3',
    },
    token: tokens.wbnb,
    quoteToken: tokens.wbnb,
    ftoken: tokens.vbnb,
    provider: 'Venus',
  },
  {
    pid: 0,
    lpSymbol: 'BANANA',
    isSingle: true,
    lpAddresses: {
      97: '',
      56: '0xFBa740304f3fc39d0e79703a5D7788E13f877DC0',
    },
    vaultAddresses: {
      97: '',
      56: '0xFC8c3Aecf046eb1e7423aC5b94ecfF1776AB7483',
    },
    strategyAddresses: {
      97: '',
      56: '0x7b9Ec0d578230f252F332B8B2c632f4467f7c2B8',
    },
    token: tokens.banana,
    quoteToken: tokens.banana,
    provider: 'Apeswap',
  },
  {
    pid: 1,
    lpSymbol: 'BANANA-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xF65C1C0478eFDe3c19b49EcBE7ACc57BB6B1D713',
    },
    vaultAddresses: {
      97: '',
      56: '0x971340Ac93bAE18351B59EAD692430E717085E0A',
    },
    strategyAddresses: {
      97: '',
      56: '0xD43ccd89278D9f5a1ab38117F13618F63344b705',
    },
    token: tokens.banana,
    quoteToken: tokens.wbnb,
    provider: 'Apeswap',
  },
  {
    pid: 2,
    lpSymbol: 'BANANA-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7Bd46f6Da97312AC2DBD1749f82E202764C0B914',
    },
    vaultAddresses: {
      97: '',
      56: '0x9Bf9d584aAC008f8703C508a054eA7A8ec4D7D38',
    },
    strategyAddresses: {
      97: '',
      56: '0xfDB06Ec9bA5F475eDa37Ef47206BbC7cae3DeE04',
    },
    token: tokens.banana,
    quoteToken: tokens.busd,
    provider: 'Apeswap',
  },
]

export default vaults
