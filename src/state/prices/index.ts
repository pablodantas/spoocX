/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceApiResponse, PriceState } from 'state/types'
import BigNumber from 'bignumber.js'

import { AbiItem } from 'web3-utils'
import { getWeb3NoAccount } from 'utils/web3'
import dryonPresaleABI from 'config/abi/dryonPresale.json'
import UniV2LPABI from 'config/abi/UniV2LP.json'
import { getDryonPresaleAddress, getHpsBnbPairAddress } from 'utils/addressHelpers'

import { CardBody } from 'jetswap-uikit-new'
import { allPricesQuery } from '../../apollo/queries'
import { client } from '../../apollo/client'

const web3 = getWeb3NoAccount()

const DryonPresaleContract = new web3.eth.Contract((dryonPresaleABI as unknown) as AbiItem, getDryonPresaleAddress())
const SafermoonBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0xa715BCCaEC59CB3F26A424a2753bf8c16F341979',
)
const AlloyBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0xaF31813EdFeB4A77CA2b928396649ee42140604e',
)
const BananaBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0xa3a2000BD9e66fA89045BBA898F45fc26A1F6d3a',
)
const XvsBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0xfa4986501ee5c4bedda5813ef430d144f01223ce',
)
const SphnBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0x43792d924cac3e3b9cb91b52d07d3d16f5ef3d35',
)
const HeroBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0xc2bF520aD8F5DF1976951fFbd82987b8AFd9c811',
)
const MochaBnbPairContract = new web3.eth.Contract(
  (UniV2LPABI as unknown) as AbiItem,
  '0xC987223331E401a29F0E5a411a4F3BD6af12Cad0',
)
const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk<PriceApiResponse>('prices/fetch', async () => {
  const tempData = {
    prices: {
      jets: 0,
      wbnb: 0,
      safermoon: 0,
      alloy: 0,
      banana: 0,
      xvs: 0,
      sphn: 0,
      hero: 0,
      mocha: 0,
    },
    update_at: null,
  }
  const jetsPrice = await (() => {
    return DryonPresaleContract.methods
      .jetsPriceInUSD()
      .call()
      .then((resp) => {
        const price = JSON.parse(resp)
        return price
      })
  })()

  tempData.prices.jets = jetsPrice / 10 ** 10 // Base to 10 decimals

  const dexData = await client.query({
    query: allPricesQuery,
    variables: {},
    fetchPolicy: 'no-cache',
  })

  if (dexData?.data) {
    const tokens = dexData.data.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].tokenDayData.length > 0) {
        tempData.prices[tokens[i].symbol.toLowerCase()] = tokens[i].tokenDayData[0].priceUSD
      }
    }
  }

  const [
    { 0: reserve00, 1: reserve01 },
    { 0: reserve10, 1: reserve11 },
    { 0: reserve20, 1: reserve21 },
    { 0: reserve30, 1: reserve31 },
    { 0: reserve40, 1: reserve41 },
    { 0: reserve50, 1: reserve51 },
    { 0: reserve60, 1: reserve61 },
  ] = await Promise.all([
    SafermoonBnbPairContract.methods.getReserves().call(),
    AlloyBnbPairContract.methods.getReserves().call(),
    BananaBnbPairContract.methods.getReserves().call(),
    XvsBnbPairContract.methods.getReserves().call(),
    SphnBnbPairContract.methods.getReserves().call(),
    HeroBnbPairContract.methods.getReserves().call(),
    MochaBnbPairContract.methods.getReserves().call(),
  ])
  if (!new BigNumber(reserve00).eq(new BigNumber(0))) {
    tempData.prices.safermoon = new BigNumber(reserve01)
      .div(reserve00)
      .div(1e9)
      .times(new BigNumber(tempData.prices.wbnb))
      .toNumber()
  }
  if (!new BigNumber(reserve10).eq(new BigNumber(0))) {
    tempData.prices.alloy = new BigNumber(reserve11)
      .div(reserve10)
      .times(new BigNumber(tempData.prices.wbnb))
      .toNumber()
  }
  if (!new BigNumber(reserve20).eq(new BigNumber(0))) {
    tempData.prices.banana = new BigNumber(reserve21)
      .div(reserve20)
      .times(new BigNumber(tempData.prices.wbnb))
      .toNumber()
  }
  if (!new BigNumber(reserve31).eq(new BigNumber(0))) {
    tempData.prices.xvs = new BigNumber(reserve30).div(reserve31).times(new BigNumber(tempData.prices.wbnb)).toNumber()
  }
  if (!new BigNumber(reserve40).eq(new BigNumber(0))) {
    tempData.prices.sphn = new BigNumber(reserve41).div(reserve40).times(new BigNumber(tempData.prices.wbnb)).toNumber()
  }
  if (!new BigNumber(reserve50).eq(new BigNumber(0))) {
    tempData.prices.hero = new BigNumber(reserve51).div(reserve50).times(new BigNumber(tempData.prices.wbnb)).toNumber()
  }
  if (!new BigNumber(reserve60).eq(new BigNumber(0))) {
    tempData.prices.mocha = new BigNumber(reserve61)
      .div(reserve60)
      .times(new BigNumber(tempData.prices.wbnb))
      .toNumber()
  }

  const data = tempData as PriceApiResponse
  // Return normalized token names
  return {
    update_at: data.update_at,
    prices: Object.keys(data.prices).reduce((accum, token) => {
      return {
        ...accum,
        [token.toLowerCase()]: data.prices[token],
      }
    }, {}),
  }
})

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPrices.fulfilled, (state, action: PayloadAction<PriceApiResponse>) => {
      state.isLoading = false
      state.lastUpdated = action.payload.update_at
      state.data = action.payload.prices
    })
  },
})

export default pricesSlice.reducer
