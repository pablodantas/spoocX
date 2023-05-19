import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.wings,
    earningToken: tokens.wings,
    contractAddress: {
      97: '',
      56: '0x63d6EC1cDef04464287e2af710FFef9780B6f9F5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.jets,
    earningToken: tokens.wings,
    contractAddress: {
      97: '',
      56: '0x63d6EC1cDef04464287e2af710FFef9780B6f9F5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0',
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: tokens.fts,
    earningToken: tokens.wings,
    contractAddress: {
      97: '',
      56: '0x63d6EC1cDef04464287e2af710FFef9780B6f9F5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0',
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 15,
    stakingToken: tokens.gfcev2,
    earningToken: tokens.wings,
    contractAddress: {
      97: '',
      56: '0x63d6EC1cDef04464287e2af710FFef9780B6f9F5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0',
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 100,
    stakingToken: tokens.wings,
    earningToken: tokens.watch,
    contractAddress: {
      97: '',
      56: '0x9e24f0D899795b94c9B6ce8134F8C3e8F79Ed37f',
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.05',
    sortOrder: 999,
    isFinished: true,
  },
  {
    sousId: 101,
    stakingToken: tokens.wings,
    earningToken: tokens.hps,
    contractAddress: {
      97: '',
      56: '0x41c8F17E7fF23Ea16B253612f33018184172ac67',
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.0222',
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 102,
    stakingToken: tokens.wings,
    earningToken: tokens.safermoon,
    contractAddress: {
      97: '',
      56: '0xccE0248E307edB891Ea9f0eE5CDEf7c12Cc76C61',
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '2500000',
    sortOrder: 999,
    isFinished: true,
  },
  {
    sousId: 103,
    stakingToken: tokens.wings,
    earningToken: tokens.alloy,
    contractAddress: {
      97: '',
      56: '0x8825a44182b94641f9299C32EF44D21235563EF7', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.22', // TO DO
    sortOrder: 999,
    isFinished: true,
  },
  {
    sousId: 104,
    stakingToken: tokens.wings,
    earningToken: tokens.banana,
    contractAddress: {
      97: '',
      56: '0x8f68cD2560A90712013D00B453e579772810b3Ed',
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.02969',
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 105,
    stakingToken: tokens.wings,
    earningToken: tokens.alloy,
    contractAddress: {
      97: '',
      56: '0x0e8ccCe477AFAC75eF11eaE33c31265cAf2CfBc2', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.22', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 106,
    stakingToken: tokens.wings,
    earningToken: tokens.xblzd,
    contractAddress: {
      97: '',
      56: '0x2240CBEbd9E04fF31C516A623D3AA802096126D9', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.0173', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 107,
    stakingToken: tokens.wings,
    earningToken: tokens.sphn,
    contractAddress: {
      97: '',
      56: '0x11Bbb1277A32D58f73A68380AAEa70C3371DBE0a', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.003', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 108,
    stakingToken: tokens.wings,
    earningToken: tokens.hero,
    contractAddress: {
      97: '',
      56: '0x4ACfAe59193976Ee1B02020730c9B0c47360C79c', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.8', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 109,
    stakingToken: tokens.wings,
    earningToken: tokens.mocha,
    contractAddress: {
      97: '',
      56: '0x76FE142b05fF6AfBc10B56C7fd8AEc3030a7D973', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.00205', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 110,
    stakingToken: tokens.wings,
    earningToken: tokens.lory,
    contractAddress: {
      97: '',
      56: '0x66aB4010407712fCAdB95e9003D60D72a645B93d', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.00589', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 111,
    stakingToken: tokens.wings,
    earningToken: tokens.ogmn,
    contractAddress: {
      97: '',
      56: '0x1A567E5d28584fE20D41a8AD2D7271AFBe014B4A', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '25000000', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 112,
    stakingToken: tokens.wings,
    earningToken: tokens.tusk,
    contractAddress: {
      97: '',
      56: '0x6116B3F0C6608dDa66E5f39fb09176b3EbDA7741', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.01', // TO DO
    sortOrder: 999,
    isFinished: true,
  },
  {
    sousId: 113,
    stakingToken: tokens.wings,
    earningToken: tokens.dep,
    contractAddress: {
      97: '',
      56: '0x013bc4281cca84C3c2fac7203c4d2859099DcE60', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '4', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 114,
    stakingToken: tokens.wings,
    earningToken: tokens.tusk,
    contractAddress: {
      97: '',
      56: '0x071B5B7029411483Bc9B8e1E873dD1623b614208', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.0005', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 115,
    stakingToken: tokens.wings,
    earningToken: tokens.hero,
    contractAddress: {
      97: '',
      56: '0x7C31e43F2431c1C94B69a8719540A6bb2dA87bb7', // TO DO
    },
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '0.5', // TO DO
    sortOrder: 999,
    isFinished: false,
  },
]

export default pools
