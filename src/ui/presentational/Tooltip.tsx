import { withStyles, Tooltip } from '@material-ui/core'

const MyTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
  },
})(Tooltip)

export default MyTooltip
