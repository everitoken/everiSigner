import * as React from 'react'
import logo from '../../asset/logo@2x.png'

class Logo extends React.PureComponent {
  render() {
    return (
      <img
        src={logo}
        alt="logo"
        style={{
          width: '15rem',
          alignSelf: 'center',
          padding: 10,
          display: 'flex',
          margin: '0 auto',
        }}
      />
    )
  }
}

export default Logo
