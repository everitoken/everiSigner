import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import {
  withStyles,
  Typography,
  IconButton,
  StyledComponentProps,
} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
type PropTypes = {
  title: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(
  (
    props: {
      onClose: () => void
      children: string
    } & StyledComponentProps
  ) => {
    const { children, classes, onClose } = props
    return (
      <MuiDialogTitle disableTypography className={classes && classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="Close"
            onClick={onClose}
            className={classes && classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    )
  }
)
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 3,
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions)

class AlertDialog extends React.Component<PropTypes> {
  render() {
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xl"
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle onClose={this.props.onClose}>
          {this.props.title}
        </DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AlertDialog
