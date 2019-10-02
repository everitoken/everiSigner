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
import labels from '../../labels'
type PropTypes = {
  title: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
}
import { UNIT } from '../../style'

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: UNIT * 2,
  },
  closeButton: {
    position: 'absolute',
    right: UNIT,
    top: UNIT,
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

const DialogContent = withStyles(() => ({
  root: {
    margin: 0,
    padding: UNIT * 3,
  },
}))(MuiDialogContent)

const DialogActions = withStyles(() => ({
  root: {
    margin: 0,
    padding: UNIT,
  },
}))(MuiDialogActions)

function AlertDialog(props: PropTypes) {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="xl"
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle onClose={props.onClose}>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={props.onClose}>
          {labels.CANCEL_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
