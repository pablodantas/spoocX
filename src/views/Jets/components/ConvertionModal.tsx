import React, { useState, useEffect, useCallback } from 'react'
import { Text, Button, Modal } from 'jetswap-uikit-new'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getJetsContract, getFuelContract } from 'utils/contractHelpers'
import useRefresh from 'hooks/useRefresh'
import { getJetsAddress } from 'utils/addressHelpers'
import { useJetsContract, useFuelContract } from 'hooks/useContract'
import { BigNumber } from 'bignumber.js'

const ModalButton = styled(Button)`
  width: 100%;
  font-weight: bold;
  font-size: 19px;
  text-align: right;
  text-transform: capitalize;
  color: #2a2a2a;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border: 0.5px solid #c0c0c0;
  box-sizing: border-box;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.input};
  padding: 10px 10px 10px 20px;
`

const StyledInput = styled.input`
  width: 100%;
  flex: 1;
  background: transparent;
  background-color: transparent;
  border: none;
  font-size: 24px;
  margin-right: 20px;
  color: ${({ theme }) => theme.colors.text};
  :focus-visible {
    background-color: transparent;
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

interface ConvertionModalProps {
  balance: BigNumber
  type: number
  onSuccess?: () => any
  onDismiss?: () => void
}

const useAllowance = (account): BigNumber => {
  const { fastRefresh } = useRefresh()

  const [allowance, setAllowance] = useState(new BigNumber(0))

  useEffect(() => {
    const fuelContract = getFuelContract()

    const fetch = async () => {
      try {
        const res = await fuelContract.methods.allowance(account, getJetsAddress()).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [account, fastRefresh])

  return allowance
}

const ConvertionModal: React.FC<ConvertionModalProps> = ({ balance, type, onSuccess, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const allowance = useAllowance(account)

  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedBuy] = useState(false)
  const [convertAmount, setConvertAmount] = useState(0)

  const onMax = () => {
    setConvertAmount(getBalanceNumber(balance, 18))
  }

  const jetsContract = useJetsContract()
  const onConvert = useCallback(async () => {
    if (!account) {
      return
    }

    try {
      setRequestedBuy(true)

      let txHash
      if (type === 0) {
        txHash = await jetsContract.methods
          .leave(new BigNumber(convertAmount).times(new BigNumber(10).pow(18)).toString())
          .send({ from: account })
          .on('transactionHash', (tx) => {
            return tx.transactionHash
          })
      } else {
        txHash = await jetsContract.methods
          .enter(new BigNumber(convertAmount).times(new BigNumber(10).pow(18)).toString())
          .send({ from: account })
          .on('transactionHash', (tx) => {
            return tx.transactionHash
          })
      }
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [account, jetsContract, convertAmount, type, setRequestedBuy])

  const fuelContract = useFuelContract()
  const onApprove = useCallback(async () => {
    if (!account) {
      return
    }

    try {
      setRequestedBuy(true)

      const txHash = await fuelContract.methods
        .approve(getJetsAddress(), new BigNumber(2).pow(256).minus(1).toString(10))
        .send({ from: account })
        .on('transactionHash', (tx) => {
          return tx.transactionHash
        })
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [account, fuelContract, setRequestedBuy])

  return (
    <Modal title={type === 0 ? t(`Convert JETS To FUEL`) : t(`Convert FUEL To JETS`)} onDismiss={onDismiss}>
      <div>
        <InputWrapper>
          <StyledInput
            type="number"
            min="0"
            value={convertAmount}
            onChange={(e) => {
              setConvertAmount(Number(e.target.value))
            }}
          />
          <Text style={{ marginRight: '20px' }}>{type === 0 ? 'JETS' : 'FUEL'}</Text>
          <Button
            style={{ color: '#2A2A2A', height: '42px' }}
            onClick={() => {
              onMax()
            }}
          >
            {t(`Max`)}
          </Button>
        </InputWrapper>
        <Text style={{ marginTop: '10px' }}>
          {t(`Balance`)}: {getBalanceNumber(balance)}
        </Text>
        {type !== 0 && allowance.lt(new BigNumber(convertAmount).times(new BigNumber(10).pow(18))) ? (
          <ModalButton
            style={{ marginTop: '25px' }}
            disabled={pendingTx || convertAmount <= 0}
            onClick={async () => {
              setPendingTx(true)
              await onApprove()
              setPendingTx(false)
            }}
          >
            {pendingTx ? t('Pending Confirmation') : t(`Approve`)}
          </ModalButton>
        ) : (
          <ModalButton
            style={{ marginTop: '25px' }}
            disabled={pendingTx || convertAmount <= 0}
            onClick={async () => {
              setPendingTx(true)
              await onConvert()
              setPendingTx(false)
              onDismiss()
            }}
          >
            {pendingTx ? t('Pending Confirmation') : t(`Convert`)}
          </ModalButton>
        )}
      </div>
    </Modal>
  )
}

export default ConvertionModal
