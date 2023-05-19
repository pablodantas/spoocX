import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getCakeAddress,
  getWingsAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getDryonPresaleAddress,
  getJetsAddress,
  getFuelAddress,
  getGfceV1Address,
  getGfceV2Address,
} from 'utils/addressHelpers'

import vaultsConfig from 'config/constants/vaults'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import cakeAbi from 'config/abi/cake.json'
import wingsAbi from 'config/abi/wings.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import jetswapStrategy from 'config/abi/jetswapStrategy.json'
import jetswapVault from 'config/abi/jetswapVault.json'
import fortressVault from 'config/abi/fortressVault.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import DryonPresaleAddressABi from 'config/abi/dryonPresale.json'
import jetsAbi from 'config/abi/jets.json'
import gfcev2Abi from 'config/abi/gfcev2.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getWingsContract = (web3?: Web3) => {
  return getContract(wingsAbi, getWingsAddress(), web3)
}
export const getCakeContract = (web3?: Web3) => {
  return getContract(cakeAbi, getCakeAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getPancakeProfileAddress(), web3)
}
export const getPancakeRabbitContract = (web3?: Web3) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), web3)
}
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}
export const getDryonPresaleContract = (web3?: Web3) => {
  return getContract(DryonPresaleAddressABi, getDryonPresaleAddress(), web3)
}
export const getBunnySpecialContract = (web3?: Web3) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getJetswapStrategyContract = (web3?: Web3, strategyAddress?: string) => {
  return getContract(jetswapStrategy, strategyAddress, web3)
}
export const getJetswapVaultContract = (web3?: Web3, vaultAddress?: string) => {
  const vaultInfo = vaultsConfig.find((v) => getAddress(v.vaultAddresses) === vaultAddress)
  if (vaultInfo.lpSymbol === 'BNB') {
    return getContract(fortressVault, vaultAddress, web3)
  }
  return getContract(jetswapVault, vaultAddress, web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getJetsContract = (web3?: Web3) => {
  return getContract(jetsAbi, getJetsAddress(), web3)
}
export const getFuelContract = (web3?: Web3) => {
  return getContract(bep20Abi, getFuelAddress(), web3)
}
export const getGfceV1Contract = (web3?: Web3) => {
  return getContract(bep20Abi, getGfceV1Address(), web3)
}
export const getGfceV2Contract = (web3?: Web3) => {
  return getContract(gfcev2Abi, getGfceV2Address(), web3)
}
