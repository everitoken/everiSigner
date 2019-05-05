import * as React from 'react'
import * as style from '../../style'

type PropTypes = {
  title: string
}
export default class ScreenHeader extends React.PureComponent<PropTypes> {
  render() {
    return (
      <p
        style={{
          textAlign: 'center',
          width: '100%',
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Open Sans',
          padding: '20px 0',
          margin: 0,
          backgroundColor: '#ececec',
          color: style.colors.headerPrimary,
        }}
      >
        {this.props.title}
      </p>
    )
  }
}
