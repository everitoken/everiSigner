import * as React from 'react'
import * as qrcode from 'qrcode'

type PropTypes = {
  data: string
  width?: number
  onClick?: (data: string) => void
}
type StateProps = {
  qr: string
}

export default class QR extends React.PureComponent<PropTypes, StateProps> {
  static defaultProps = {
    width: 500,
    onClick: () => null,
  }

  state = {
    qr: '',
  }

  componentWillReceiveProps(newProps: PropTypes) {
    if (newProps.data !== this.props.data) {
      this.generateQr(newProps)
    }
  }

  generateQr = (props: PropTypes) => {
    qrcode
      .toDataURL(props.data, {
        width: props.width,
      })
      .then((qr: string) => this.setState({ qr }))
  }

  componentWillMount() {
    this.generateQr(this.props)
  }

  render() {
    if (!this.state.qr) {
      return null
    }

    return (
      <img
        src={this.state.qr}
        width="100%"
        onClick={() =>
          this.props.onClick && this.props.onClick(this.props.data)
        }
      />
    )
  }
}
