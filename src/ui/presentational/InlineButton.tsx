import { withStyles, Button } from '@material-ui/core'

const StyledButton = withStyles({
  root: {
    padding: '2px 3px',
  },
  text: {
    textTransform: 'none',
  },
})(Button)

export default StyledButton
