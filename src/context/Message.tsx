import * as React from 'react'
import { noop } from 'lodash'
import Snackbar from '../ui/presentational/SnackbarMessage'

type ShowProps = {
  variant?: string
  message: string
}
type ContextTypes = {
  open: boolean
  show: (showProps: ShowProps) => void
  hide: () => void
}

const MessageContext = React.createContext<ContextTypes>({
  open: false,
  show: noop,
  hide: noop,
})

export const MessageContextProvider = (props: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const show = (opts: ShowProps) => {
    setOpen(true)
    setMessage(opts.message)
  }
  const hide = () => setOpen(false)

  return (
    <MessageContext.Provider value={{ open, show, hide }}>
      {props.children}
      <Snackbar open={open} message={message} onClose={hide} />
    </MessageContext.Provider>
  )
}

export default MessageContext
