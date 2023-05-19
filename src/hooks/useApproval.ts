import { useCallback, useState } from 'react'
import { useLotteryApprove } from './useApprove'

export const useApproval = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { onApprove } = useLotteryApprove()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  return { handleApprove, requestedApproval }
}

export default useApproval
