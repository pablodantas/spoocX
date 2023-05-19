import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getWingsAddress = () => {
  return getAddress(tokens.wings.address)
}
export const getCakeAddress = () => {
  return getAddress(tokens.cake.address)
}
export const getWingsBnbPairAddress = () => {
  return getAddress(addresses.wingsBnbPair)
}
export const getWingsBusdPairAddress = () => {
  return getAddress(addresses.wingsBusdPair)
}
export const getDryonPresaleAddress = () => {
  return getAddress(addresses.dryonPresale)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getPancakeMasterChefAddress = () => {
  return getAddress(addresses.pancakeMasterChef)
}
export const getApeswapMasterChefAddress = () => {
  return getAddress(addresses.apeswapMasterChef)
}
export const getAutoFarmMasterChefAddress = () => {
  return getAddress(addresses.autoFarmMasterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getHpsBnbPairAddress = () => {
  return getAddress(addresses.hpsBnbPair)
}
export const getJetsAddress = () => {
  return getAddress(tokens.jets.address)
}
export const getFuelAddress = () => {
  return getAddress(tokens.fuel.address)
}
export const getGfceV1Address = () => {
  return getAddress(addresses.gfcev1)
}
export const getGfceV2Address = () => {
  return getAddress(addresses.gfcev2)
}
