import { NetworkItemType, ValidatorRespType } from '../types'
import { useState, useEffect } from 'react'

function useValidator(network: NetworkItemType) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ValidatorRespType | null>(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${network.url}/v1/chain/get_staking`)
      .then(data => data.json())
      .then(json => {
        setData(json)
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }, [network])

  return { loading, error, data }
}

export default useValidator
