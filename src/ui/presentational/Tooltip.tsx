import { withStyles, Tooltip } from '@material-ui/core'

const MyTooltip = withStyles({
  tooltip: {
    fontSize: '14px',
    maxWidth: 'none',
  },
})(Tooltip)

export default MyTooltip
