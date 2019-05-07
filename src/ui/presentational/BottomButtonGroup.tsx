import * as React from 'react'
import { Grid, Divider } from '@material-ui/core'
import Button from './InlineButton'

type PropTypes = {
  onSecondaryButtonClick: () => void
  onPrimaryButtonClick: () => void
}

class BottomButtonGroup extends React.PureComponent<PropTypes> {
  render() {
    const { onSecondaryButtonClick, onPrimaryButtonClick } = this.props
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingLeft: 16 }}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onSecondaryButtonClick}
            >
              Cancel
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingRight: 16 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onPrimaryButtonClick}
            >
              Authorize
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default BottomButtonGroup
