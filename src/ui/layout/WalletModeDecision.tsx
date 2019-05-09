import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { WithRouterType } from '../../types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'
import { List, ListItem, CardActionArea } from '@material-ui/core'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import { IconButton } from '@material-ui/core'

type PropTypes = {} & WithRouterType

type OptionType = {
  onClick: () => void
  title: string
  description: string
}
const Option = (props: OptionType) => (
  <Card raised>
    <CardActionArea onClick={props.onClick}>
      <CardContent>
        <FlexContainer direction="row" alignItems="center">
          <FlexContainer>
            <Typography variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography>{props.description}</Typography>
          </FlexContainer>
          <ForwardIcon fontSize="large" />
        </FlexContainer>
      </CardContent>
    </CardActionArea>
  </Card>
)
class WalletDecision extends React.PureComponent<PropTypes> {
  render() {
    const { history } = this.props

    return (
      <NavigationLayout
        title="设置新钱包"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer justifyContent="space-between">
          <List>
            <ListItem>
              <Option
                onClick={() => history.push('/wallet/import')}
                title="Import a wallet"
                description="Import your existing wallet using a 12 word seed phrase. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quos laboriosam asperiores, quibusdam alias id maiores error beatae."
              />
            </ListItem>
            <ListItem>
              <Option
                onClick={() => history.push('/wallet/create')}
                title="Create a wallet"
                description="This will create a new wallet and seed phrase and multiple Evt accounts can be created."
              />
            </ListItem>
          </List>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}

export default withRouter(WalletDecision)
