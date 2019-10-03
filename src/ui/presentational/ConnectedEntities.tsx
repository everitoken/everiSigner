import * as React from 'react'
import { Grid, withStyles, StyledComponentProps } from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircle'
import styled from 'styled-components'

type PropTypes = {
  left: React.ReactNode
  right: React.ReactNode
}

const styles = {
  root: {
    color: 'green',
  },
  item: {
    whiteSpace: 'nowrap',
  },
}

const LineContainer = styled.div`
  display: flex;
  flex: 1;
  margin-left: -3rem;
  margin-right: -3rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`
const Line = styled.div`
  height: 2;
  display: flex;
  flex: 1;
  border-bottom: 2px dashed #ccc;
`

function ConnectedEntities(props: PropTypes & StyledComponentProps) {
  const { left, right, classes } = props
  return (
    <Grid container spacing={0} direction="row" alignItems="flex-start">
      <Grid className={classes && classes.item} item xs={5}>
        {left}
      </Grid>

      <LineContainer>
        <Line />
        <div>
          <CheckCircle
            className={classes && classes.root}
            color="primary"
            fontSize="large"
          />
        </div>
        <Line />
      </LineContainer>
      <Grid className={classes && classes.item} item xs={5}>
        {right}
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ConnectedEntities)
