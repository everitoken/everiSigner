import { withStyles, Button } from '@material-ui/core'

const StyledButton = withStyles({
  root: {
    padding: '2px 3px',
    width: '100%',
    minHeight: '3.5rem',
  },
  text: {
    textTransform: 'none',
  },
})(Button)

export default StyledButton
