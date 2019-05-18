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

  componentWillMount() {
    qrcode
      .toDataURL(this.props.data, {
        width: this.props.width,
      })
      .then((qr: string) => this.setState({ qr }))
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
