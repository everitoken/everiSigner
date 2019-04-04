import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type PropTypes = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

type StateTypes = {};

class AlertDialog extends React.Component<PropTypes, { open: boolean }> {
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
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Confirm and dismiss
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
