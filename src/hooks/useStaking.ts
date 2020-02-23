import { AccountStateType } from '../store/reducer/accounts'
import { NetworkItemType, StakeRespType } from '../types'
import { useState, useEffect } from 'react'

function useStaking(account: AccountStateType, network: NetworkItemType) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<StakeRespType | null>(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${network.url}/v1/evt/get_staking_shares`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: account.publicKey }),
    })
      .then(data => data.json())
      .then(json => {
        setData(json)
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }, [account, network])

  return { loading, error, data }
}

export default useStaking
