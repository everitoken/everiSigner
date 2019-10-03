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

function BottomButtonGroup(props: PropTypes) {
  const {
    onSecondaryButtonClick,
    onPrimaryButtonClick,
    primaryButtonText,
    secondaryButtonText,
    primaryButtonDisabled,
    secondaryButtonDisabled,
  } = props

  return (
    <Grid container>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <div style={{ paddingLeft: 16 }}>
          <Button
            disabled={secondaryButtonDisabled || false}
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
            disabled={primaryButtonDisabled || false}
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

export default BottomButtonGroup
