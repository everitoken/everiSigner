import * as React from 'react'
import MonoText from './MonospaceText'
import {
  Typography,
  Avatar,
  Grid,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core'

type PropTypes = {
  title: string
  renderAvatar?: (props: { title: string; subtitle: string }) => React.ReactNode
  subtitle: string
}

const styles = {
  avatar: {
    width: '4rem',
    height: '4rem',
    marginBottom: 8,
  },
}

class CircularEntity extends React.PureComponent<
  PropTypes & StyledComponentProps
> {
  render() {
    const { renderAvatar, title, subtitle, classes } = this.props
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        alignContent="center"
      >
        {renderAvatar ? (
          renderAvatar({ title, subtitle })
        ) : (
          <Avatar className={classes && classes.avatar} alt={title}>
            {title.substring(0, 1).toUpperCase()}
          </Avatar>
        )}
        <span style={{ fontSize: 13 }}>
          <MonoText>
            {title.length > 12 ? `${title.substring(0, 12)}...` : title}
          </MonoText>
        </span>
        <Typography variant="caption">
          {subtitle.length > 33 ? `${subtitle.substring(0, 33)}...` : subtitle}
        </Typography>
      </Grid>
    )
  }
}

export default withStyles(styles)(CircularEntity)
