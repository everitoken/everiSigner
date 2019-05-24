import * as React from 'react'
import { Grid, Divider } from '@material-ui/core'
import Button from './InlineButton'

type PropTypes = {
  onSecondaryButtonClick: () => void
  onPrimaryButtonClick: () => void
  primaryButtonText: string
  secondaryButtonText: string
  primaryButtonDisabled?: boolean
  secondaryButtonDisabled?: boolean
}

class BottomButtonGroup extends React.PureComponent<PropTypes> {
  render() {
    const {
      onSecondaryButtonClick,
      onPrimaryButtonClick,
      primaryButtonText,
      secondaryButtonText,
    } = this.props
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingLeft: 16 }}>
            <Button
              disabled={this.props.secondaryButtonDisabled || false}
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingRight: 16 }}>
            <Button
              disabled={this.props.primaryButtonDisabled || false}
              variant="contained"
              color="primary"
              size="large"
              onClick={onPrimaryButtonClick}
            >
              {primaryButtonText}
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default BottomButtonGroup
