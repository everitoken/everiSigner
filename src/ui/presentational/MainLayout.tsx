import * as React from 'react'
import * as style from '../../style'
import styled from 'styled-components'
import { Grid, IconButton, Typography } from '@material-ui/core'
import { imageDataUriMap } from '../../asset'
import SettingsIcon from '@material-ui/icons/Settings'
import FlexContainer from '../presentational/FlexContainer'

type PropTypes = {
  renderHead: () => React.ReactNode
  renderLogo?: boolean
  children: React.ReactNode
}

class MainLayout extends React.PureComponent<PropTypes> {
  static defaultProps = {
    renderLogo: false,
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          style={{
            height: 65,
            backgroundColor: '#ececec',
            display: 'flex',
            alignContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {this.props.renderLogo ? (
            <div style={{ marginLeft: 8 }}>
              <img src={imageDataUriMap['1.transparent']} alt="everitoken" />
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              flex: 1,
              marginLeft: this.props.renderLogo ? -50 : 0,
            }}
          >
            {this.props.renderHead()}
          </div>
        </div>
        <div style={{ display: 'flex', flex: '1' }}>{this.props.children}</div>
      </div>
    )
  }
}

type NavigationLayoutPropTypes = {
  title: string
  children: React.ReactNode
  renderLeft: () => React.ReactNode
  renderRight?: () => React.ReactNode
}

export const NavigationLayout = (props: NavigationLayoutPropTypes) => {
  return (
    <FlexContainer>
      <div
        style={{
          height: 68,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid #ececec`,
          alignSelf: 'stretch',
          marginLeft: 8,
        }}
      >
        <FlexContainer direction="row" alignItems="center">
          <div style={{ marginRight: 8 }}>{props.renderLeft()}</div>
          <Typography variant="h5">{props.title}</Typography>
        </FlexContainer>
        {props.renderRight ? (
          <div style={{ marginRight: 4 }}>{props.renderRight()}</div>
        ) : null}
      </div>
      <FlexContainer direction="row">{props.children}</FlexContainer>
    </FlexContainer>
  )
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
            <SettingsIcon onClick={props.onMoreClick} />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  )
}

export default MainLayout
