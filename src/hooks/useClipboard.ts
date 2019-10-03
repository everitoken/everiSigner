import * as React from 'react'

type Option = {
  duration: number
}

const defaultOption: Option = {
  duration: 5000,
}

function useClipboard(
  opts: Option = defaultOption
): [boolean, (data: string) => Promise<{ success: boolean; payload: any }>] {
  const [isCopied, setIsCopied] = React.useState(false)

  let handler: any = 0

  const copy = async (data: string) => {
    clearTimeout(handler)
    try {
      navigator.clipboard.writeText(data)

      setIsCopied(true)
      handler = setTimeout(() => setIsCopied(false), opts.duration)
      return { success: true, payload: null }
    } catch (e) {
      return { success: false, payload: e }
    }
  }

  return [isCopied, copy]
}

export default useClipboard
