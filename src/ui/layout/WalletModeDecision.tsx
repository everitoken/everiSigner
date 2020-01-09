import * as React from 'react'
import { useHistory } from 'react-router-dom'
import labels from '../../labels'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'
import { List, ListItem, CardActionArea } from '@material-ui/core'
import ForwardIcon from '@material-ui/icons/ChevronRight'

type OptionType = {
  onClick: () => void
  title: string
  description: string
}

const Option = (props: OptionType) => (
  <Card raised style={{ width: '100%' }}>
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

function WalletDecision() {
  const history = useHistory()

  return (
    <NavigationLayout
      title="设置新钱包"
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer justifyContent="space-between">
        <List>
          <ListItem>
            <Option
              onClick={() => history.push('/wallet/create')}
              title={labels.WALLET_CREATE}
              description={labels.WALLET_CREATE_DESCRIPTION}
            />
          </ListItem>
          <ListItem>
            <Option
              onClick={() => history.push('/wallet/import')}
              title={labels.IMPORT_WALLET_TITLE}
              description={labels.IMPORT_WALLET_DESCRIPTION}
            />
          </ListItem>
        </List>
      </FlexContainer>
    </NavigationLayout>
  )
}

export default WalletDecision
