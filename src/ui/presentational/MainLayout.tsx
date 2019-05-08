import * as React from 'react'
import * as style from '../../style'
import styled from 'styled-components'
import { Grid, IconButton } from '@material-ui/core'
import { imageDataUriMap } from '../../asset'
import MoreVert from '@material-ui/icons/MoreVert'

type PropTypes = {
  renderHead: () => React.ReactNode
  children: React.ReactNode
}

class MainLayout extends React.PureComponent<PropTypes> {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          style={{
            height: 60,
            backgroundColor: '#ececec',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.props.renderHead()}
        </div>
        <div style={{ display: 'flex', flex: '1' }}>{this.props.children}</div>
      </div>
    )
  }
}

const HeaderText = styled.p`
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Open Sans';
  padding: 20px 0;
  margin: 0;
  color: ${style.colors.headerPrimary};
`

export const HeaderTitle = (props: { title: string }) => (
  <HeaderText>{props.title}</HeaderText>
)

type TopActionBarPropTypes = {
  onMoreClick: () => any
  onLogoClick: () => any
  renderMiddle: () => React.ReactNode
}

export const TopActionBar = (props: TopActionBarPropTypes) => {
  return (
    <Grid container justify="space-between" spacing={0} alignItems="center">
      <Grid item>
        <img
          src={imageDataUriMap['1.transparent']}
          width="45"
          alt="logo"
          style={{ marginLeft: 8 }}
          onClick={props.onLogoClick}
        />
      </Grid>
      <Grid item>{props.renderMiddle()}</Grid>

      <Grid item>
        <div style={{ marginRight: 4 }}>
          <IconButton>
            <MoreVert onClick={props.onMoreClick} />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}

export default MainLayout
