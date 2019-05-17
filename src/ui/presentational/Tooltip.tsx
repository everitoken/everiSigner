import { withStyles, Tooltip } from '@material-ui/core'

const MyTooltip = withStyles({
  tooltip: {
    fontSize: '12px',
    maxWidth: '350px',
  },
})(Tooltip)

export default MyTooltip
