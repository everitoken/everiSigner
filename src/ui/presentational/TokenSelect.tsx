import * as React from 'react'
import { TokenDetail } from '../../types'
import FlexContainer from './FlexContainer'
import {
  Card,
  CardActionArea,
  CardActions,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import labels from '../../labels'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import styled from 'styled-components'
type TokenSelectPropTypes = {
  loading: boolean
  data: TokenDetail
}
type TokenSelectStateTypes = {
  balance: string
}

const TokenName = styled.p`
  font-family: 'Roboto Mono';
  margin-bottom: 4px;
  margin-top: 8px;
  font-size: 15px;
`
const Balance = styled.span`
  font-family: 'Roboto Mono';
`
const BalanceContainer = styled.div`
  margin-left: 25px;
`

const BALANCE_PLACEHOLDER = '--.--'
class TokenSelect extends React.PureComponent<
  TokenSelectPropTypes,
  TokenSelectStateTypes
> {
  state = {
    balance: this.props.loading ? BALANCE_PLACEHOLDER : this.props.data.value,
  }
  componentWillReceiveProps(nextProps: TokenSelectPropTypes) {
    if (nextProps.data !== this.props.data) {
      console.log('not equal')
      this.forceUpdate()
    }
  }
  render() {
    const { data } = this.props
    return (
      <Card>
        <CardActionArea>
          {this.props.loading ? (
            <div style={{ textAlign: 'center', padding: 10 }}>
              <CircularProgress disableShrink size={20} />
            </div>
          ) : (
            <FlexContainer
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <img
                src={data.logoDataUri}
                alt="logo"
                width={20}
                style={{ padding: 8 }}
              />
              <FlexContainer>
                <TokenName>{`${data.name} (#${data.id})`}</TokenName>
                <Typography variant="caption" style={{ marginBottom: '8px' }}>
                  {labels.TOKEN_SELECT_SECONDARY_TEXT}
                </Typography>
              </FlexContainer>
              <ForwardIcon />
            </FlexContainer>
          )}
        </CardActionArea>
        <CardActions>
          <BalanceContainer style={{ paddingLeft: 25 }}>
            <Balance>
              {labels.BALANCE_REST}:
              {this.props.loading ? BALANCE_PLACEHOLDER : this.props.data.value}
            </Balance>
          </BalanceContainer>
        </CardActions>
      </Card>
    )
  }
}

export default TokenSelect
