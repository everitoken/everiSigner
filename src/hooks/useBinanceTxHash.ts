import { useState, useCallback } from 'react'
const url = 'https://dex.binance.org/'

function useBinanceTxHash() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{} | null>(null)
  const [error, setError] = useState(null)

  const getData = useCallback((hash: string) => {
    setLoading(true)
    fetch(`${url}api/v1/tx/${hash}?format=json`)
      .then(data => data.json())
      .then(json => {
        setData(json)
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, error, data, getData }
}

export default useBinanceTxHash
