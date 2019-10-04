import * as React from 'react'
import { StyledComponentProps } from '@material-ui/core'
import * as Evtjs from 'evtjs'
import QR from './QR'

type PropTypes = {
  publicKey: string
}

const generate = (props: PropTypes, cb: (qr: string) => void) => {
  const { EvtLink } = Evtjs

  EvtLink.getEvtLinkForPayeeCode({
    address: props.publicKey,
  }).then(({ rawText }: { rawText: string }) => {
    cb(rawText)
  })
}

function PayeeCode(props: PropTypes & StyledComponentProps) {
  const [qr, setQr] = React.useState('')

  React.useEffect(() => {
    generate(props, setQr)
  }, [props.publicKey])
  if (!qr) {
    return null
  }

  return <QR data={qr} width={300} />
}

export default PayeeCode
