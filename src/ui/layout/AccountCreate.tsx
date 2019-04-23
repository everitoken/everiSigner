import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import Container from '../presentational/FlexContainer'
import { padding } from '../../style'
import AccountCreate from '../presentational/AccountCreate'
import { connect } from 'react-redux'
import { getDefaultAccountDecrypted } from '../../store/getter'
import { createDefaultAccount } from '../action'

function TabContainer({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="div"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 300,
        padding: padding.standard / 2,
      }}
    >
      {children}
    </Typography>
  )
}

const ConnectedAccountCreate = connect(
  getDefaultAccountDecrypted,
  { onClick: createDefaultAccount }
)(AccountCreate)

class AccountCreateBar extends React.PureComponent<{}, { value: number }> {
  state = {
    value: 0,
  }

  handleChange = (event, value: number) => {
    this.setState({ value })
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index })
  }

  render() {
    return (
      <Container justifyContent="flex-start">
        <div style={{ paddingBottom: padding.standard * 2 }}>
          <Typography variant="h4">Create Account</Typography>
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Create" />
            <Tab label="Import" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            <ConnectedAccountCreate />
          </TabContainer>
          <TabContainer>Here is to import an account</TabContainer>
        </SwipeableViews>
      </Container>
    )
  }
}

export default () => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <AccountCreateBar />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to create an Account." />
      )
    }}
  </WithAuthentication>
)
