import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from 'jetswap-uikit-new'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import { getWeb3NoAccount } from 'utils/web3'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchVaultsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
  setBlock,
} from './actions'
import { State, Farm, Pool, Vault, Block, ProfileState, TeamsState, AchievementState, PriceState } from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchPrices } from './prices'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const prices = useGetApiPrices()

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    if (prices) {
      dispatch(fetchVaultsPublicDataAsync(prices))
    }
  }, [dispatch, prices, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm && farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm && farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm && farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm && farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Vaults

export const useValuts = (): Vault[] => {
  const vaults = useSelector((state: State) => state.vaults.data)
  return vaults
}

export const useVaultFromPid = (pid, provider): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((f) => f.pid === pid && f.provider === provider))
  return vault
}

export const useVaultFromSymbol = (lpSymbol: string): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((f) => f.lpSymbol === lpSymbol))
  return vault
}

export const useVaultUser = (pid, provider) => {
  const vault = useVaultFromPid(pid, provider)

  return {
    allowance: vault && vault.userData ? new BigNumber(vault.userData.allowance) : new BigNumber(0),
    tokenBalance: vault && vault.userData ? new BigNumber(vault.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: vault && vault.userData ? new BigNumber(vault.userData.stakedBalance) : new BigNumber(0),
    earnings: vault && vault.userData ? new BigNumber(vault.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch, slowRefresh])
}

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[token.toLowerCase()]
}

// Block
export const useBlock = (): Block => {
  return useSelector((state: State) => state.block)
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 7 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceWingsBusd = (): BigNumber => {
  const pid = 4 // WINGS-BUSD LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceFTSBusd = (): BigNumber => {
  const pid = 6 // FTS-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceGFCEBusd = (): BigNumber => {
  const pid = 16 // GFCE-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceWatchBusd = (): BigNumber => {
  const pid = 21 // WATCH-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceXblzdBusd = (): BigNumber => {
  const pid = 23 // xBLZD-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBTCBBusd = (): BigNumber => {
  const pid = 11 // BTCB-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceETHBusd = (): BigNumber => {
  const pid = 12 // ETH-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceFuelBusd = (): BigNumber => {
  const pid = 5 // Fuel-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceCakeBusd = (): BigNumber => {
  const pid = 24 // CAKE-BNB LP
  const farm = useFarmFromPid(pid)
  const bnbPriceUSD = usePriceBnbBusd()
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceAutoBusd = (): BigNumber => {
  const pid = 22 // AUTO-BNB LP
  const farm = useFarmFromPid(pid)
  const bnbPriceUSD = usePriceBnbBusd()
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceLoryBusd = (): BigNumber => {
  const pid = 25 // LORY-BNB LP
  const farm = useFarmFromPid(pid)
  const bnbPriceUSD = usePriceBnbBusd()
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceOgmnBusd = (): BigNumber => {
  const pid = 26 // OGMN-BNB LP
  const farm = useFarmFromPid(pid)
  const bnbPriceUSD = usePriceBnbBusd()
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceTuskBusd = (): BigNumber => {
  const pid = 27 // TUSK-BNB LP
  const farm = useFarmFromPid(pid)
  const bnbPriceUSD = usePriceBnbBusd()
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceDepBusd = (): BigNumber => {
  const pid = 28 // DEP-BNB LP
  const farm = useFarmFromPid(pid)
  const bnbPriceUSD = usePriceBnbBusd()
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  const bnbPriceUSD = usePriceBnbBusd()
  const wingsPriceUSD = usePriceWingsBusd()
  const ftsPriceUSD = usePriceFTSBusd()
  const gfcePriceUSD = usePriceGFCEBusd()
  const watchPriceUSD = usePriceWatchBusd()
  const xblzdPriceUSD = usePriceXblzdBusd()
  const btcbPriceUSD = usePriceBTCBBusd()
  const ethPriceUSD = usePriceETHBusd()
  const cakePriceUSD = usePriceCakeBusd()
  const autoPriceUSD = usePriceAutoBusd()
  const loryPriceUSD = usePriceLoryBusd()
  const ogmnPriceUSD = usePriceOgmnBusd()
  const tuskPriceUSD = usePriceTuskBusd()
  const depPriceUSD = usePriceDepBusd()

  return {
    busd: new BigNumber(1),
    wbnb: bnbPriceUSD,
    wings: wingsPriceUSD,
    fts: ftsPriceUSD,
    gfcev2: gfcePriceUSD,
    jets: new BigNumber(prices ? prices.jets : 0),
    watch: watchPriceUSD,
    hps: new BigNumber(prices ? prices.hps : 0),
    safermoon: new BigNumber(prices ? prices.safermoon : 0),
    alloy: new BigNumber(prices ? prices.alloy : 0),
    banana: new BigNumber(prices ? prices.banana : 0),
    xvs: new BigNumber(prices ? prices.xvs : 0),
    xblzd: xblzdPriceUSD,
    btcb: btcbPriceUSD,
    eth: ethPriceUSD,
    cake: cakePriceUSD,
    auto: autoPriceUSD,
    sphn: new BigNumber(prices ? prices.sphn : 0),
    hero: new BigNumber(prices ? prices.hero : 0),
    mocha: new BigNumber(prices ? prices.mocha : 0),
    lory: loryPriceUSD,
    ogmn: ogmnPriceUSD,
    tusk: tuskPriceUSD,
    dep: depPriceUSD,
  }
}
