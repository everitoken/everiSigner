const isMessageTypeof = (type: string) => (msgType: string): boolean => {
  let result = true
  try {
    const parts = msgType.split('/')
    result = parts[0] === type
  } catch (e) {
    result = false
  }
  return result
}

export const isPopMessage = isMessageTypeof('popup')
export const isClientMessage = isMessageTypeof('everisigner')
