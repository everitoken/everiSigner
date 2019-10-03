import * as React from 'react'
import * as qrcode from 'qrcode'

type PropTypes = {
  data: string
  width?: number
  onClick?: (data: string) => void
}

function generateQr(props: PropTypes, cb: (qr: string) => void) {
  qrcode
    .toDataURL(props.data, {
      width: props.width || 500,
    })
    .then(cb)
}

export default function QR(props: PropTypes) {
  const [qr, setQr] = React.useState('')

  React.useEffect(() => {
    generateQr(props, setQr)
  }, [props.data])

  if (!qr) {
    return null
  }

  return (
    <img
      src={qr}
      width="100%"
      onClick={() => props.onClick && props.onClick(props.data)}
    />
  )
}
