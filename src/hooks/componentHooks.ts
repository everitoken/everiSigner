import * as React from 'react'
import useClipboard from './useClipboard'
import MessageContext from '../context/Message'

export const useCopyToClipboard = (
  message: string
): [boolean, (d: string) => Promise<void>] => {
  const [isCopied, copy] = useClipboard()
  const { show } = React.useContext(MessageContext)

  const handleCopy = async (data: string) => {
    const { success } = await copy(data)
    if (success) {
      show({ message })
    }
  }

  return [isCopied, handleCopy]
}
