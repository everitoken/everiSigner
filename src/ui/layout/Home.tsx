import * as React from 'react'
import Button from '@material-ui/core/Button'
import AccountBarLayout from './AccountBarLayout'
import FlexContainer from '../presentational/FlexContainer'

type PropTypes = {}

type StateTypes = {
  key: string
}

class Home extends React.PureComponent<PropTypes, StateTypes> {
  handleClick = () => {}

  handleResetState = () => {
    window.persistor.purge()
  }

  render() {
    return (
      <AccountBarLayout>
        <FlexContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Button
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleResetState}
          >
            Reset state
          </Button>
        </FlexContainer>
      </AccountBarLayout>
    )
  }
}
export default Home
