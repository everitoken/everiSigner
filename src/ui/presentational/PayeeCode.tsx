import * as React from 'react'
import { StyledComponentProps } from '@material-ui/core'
import * as Evtjs from 'evtjs'
import QR from './QR'

type PropTypes = {
  publicKey: string
}

type StateTypes = {
  qr: string
}
class PayeeCode extends React.PureComponent<
  PropTypes & StyledComponentProps,
  StateTypes
> {
  state = {
    qr: '',
  }

  generate = (props: PropTypes) => {
    const { EvtLink } = Evtjs

    EvtLink.getEvtLinkForPayeeCode({
      address: props.publicKey,
    }).then((data: { rawText: string }) => {
      this.setState({ qr: data.rawText })
    })
  }

  componentWillReceiveProps(newProps: PropTypes) {
    if (newProps.publicKey !== this.props.publicKey) {
      this.generate(newProps)
    }
  }

  componentWillMount() {
    this.generate(this.props)
  }

  render() {
    if (!this.state.qr) {
      return null
    }

    return <QR data={this.state.qr} width={300} />
  }
}

export default PayeeCode
