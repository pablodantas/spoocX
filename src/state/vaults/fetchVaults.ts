import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import jetswapVaultABI from 'config/abi/jetswapVault.json'
import multicall from 'utils/multicall'
import {
  getAddress,
  getMasterChefAddress,
  getPancakeMasterChefAddress,
  getAutoFarmMasterChefAddress,
  getApeswapMasterChefAddress,
} from 'utils/addressHelpers'
import vaultsConfig from 'config/constants/vaults'
import { getSingleFortressVaultApy, getSingleVenusVaultApy } from 'utils/apy'

const fetchVaults = async (prices) => {
  const data = await Promise.all(
    vaultsConfig.map(async (vaultConfig) => {
      const lpAddress = getAddress(vaultConfig.lpAddresses)
      let masterchefAddress = getMasterChefAddress()
      if (vaultConfig.provider === 'Pancake') {
        masterchefAddress = getPancakeMasterChefAddress()
      } else if (vaultConfig.provider === 'autofarm') {
        masterchefAddress = getAutoFarmMasterChefAddress()
      } else if (vaultConfig.provider === 'Apeswap') {
        masterchefAddress = getApeswapMasterChefAddress()
      }
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(vaultConfig.token.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(vaultConfig.quoteToken.address),
          name: 'balanceOf',
          params: [lpAddress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [vaultConfig.provider === 'autofarm' ? getAddress(vaultConfig.stratxAddress) : masterchefAddress],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(vaultConfig.token.address),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(vaultConfig.quoteToken.address),
          name: 'decimals',
        },
        // Balance of token in the master chef contract
        {
          address: getAddress(vaultConfig.token.address),
          name: 'balanceOf',
          params: [masterchefAddress],
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
        tokenBalanceMC,
      ] = await multicall(erc20, calls)
      // Get Total Locked Value in Vault contract
      const [vaultBalance] = await multicall(jetswapVaultABI, [
        {
          address: getAddress(vaultConfig.vaultAddresses),
          name: 'balance',
          params: [],
        },
      ])

      // Vault
      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(vaultBalance).div(new BigNumber(lpTotalSupply))
      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Farm
      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenMcRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalMcInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenMcRatio)

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals))
      const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(quoteTokenDecimals))

      const [info, totalAllocPoint] = await multicall(masterchefABI, [
        {
          address: masterchefAddress,
          name: 'poolInfo',
          params: [vaultConfig.pid],
        },
        {
          address: masterchefAddress,
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      // Get APY for single token vault
      let apy = 0
      if (vaultConfig.lpSymbol === 'BNB' || vaultConfig.lpSymbol === 'BTCB' || vaultConfig.lpSymbol === 'ETH') {
        let _apy = [0]
        if (vaultConfig.provider === 'Fortress') {
          _apy = await getSingleFortressVaultApy(vaultConfig, prices)
        } else if (vaultConfig.provider === 'Venus') {
          _apy = await getSingleVenusVaultApy(vaultConfig, prices)
        }
        apy = new BigNumber(_apy[0]).dp(2, 1).toNumber()
      }

      return {
        ...vaultConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        lpTotalMcInQuoteToken: lpTotalMcInQuoteToken.toJSON(),
        tokenPriceVsQuote: tokenAmount.isZero() ? null : quoteTokenAmount.div(tokenAmount).toJSON(),
        poolWeight: poolWeight.toJSON(),
        vaultBalance: new BigNumber(vaultBalance).div(new BigNumber(10).pow(18)).toJSON(),
        tokenBalanceMC: new BigNumber(tokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals)).toJSON(),
        apy,
      }
    }),
  )
  return data
}

export default fetchVaults
