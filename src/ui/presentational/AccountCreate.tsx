import * as React from "react";
import AlertDialog from "./AlertDialog";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import SeedWordsDisplay from "./SeedWordsDisplay";
import FlexContainer from "./FlexContainer";
import { AccountStateType } from "../../store/reducer/accounts";
import { CreateDefaultAccountType } from "../action";
import * as uuid from "uuid";

type AccountCreatePropTypes = {
  account: AccountStateType;
  onClick: (id: string, accountName: string) => CreateDefaultAccountType;
};

type AccountCreateStateTypes = {
  id: string;
  accountName: string;
  invalid: boolean;
  modalState: boolean;
};

class AccountCreate extends React.PureComponent<
  AccountCreatePropTypes,
  AccountCreateStateTypes
> {
  state = {
    id: null,
    accountName: "Untitled account",
    invalid: false,
    modalState: false
  };
  handleAccountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    this.setState({ accountName: value });
  };
  isValid = () => {
    if (
      this.state.accountName.length === 0 ||
      this.state.accountName.length > 25
    ) {
      return false;
    }

    return true;
  };
  handleOnCreate = () => {
    const isValid = this.isValid();

    if (!isValid) {
      this.setState({ invalid: true });
      return;
    }

    const id = uuid.v4();
    this.setState({ id, modalState: true, invalid: false });

    this.props.onClick(id, this.state.accountName);
  };
  handleModalClose = () => {
    this.setState({ modalState: false });
  };
  render() {
    const { account } = this.props;
    console.log(account);

    if (account) {
      if (account.id === this.state.id) {
        return (
          <React.Fragment>
            <Typography component="h6">
              Seed phrases for you account, please keep it safe.
            </Typography>
            <SeedWordsDisplay words={account.words} />
          </React.Fragment>
        );
      }
      return (
        <p>
          You have already created an default account. You can alternatively
          import "loose account".
        </p>
      );
    }
    return (
      <React.Fragment>
        <AlertDialog
          title="Account Seed"
          open={this.state.modalState}
          onClose={this.handleModalClose}
        >
          <Typography component="p" variant="body1">
            Seed phrases for you account, please keep it safe.
          </Typography>
        </AlertDialog>
        <FlexContainer justifyContent="space-around">
          <Typography component="p" color="textSecondary">
            This is your <b>default account</b>, this account will be
            recoverable with your seed phrases. The account name must be within
            25 characters.
          </Typography>
          <FormControl>
            <InputLabel htmlFor="account-name">
              Specify account name (less than 25 chars)
            </InputLabel>
            <Input
              autoFocus
              error={this.state.invalid}
              id="account-name"
              value={this.state.accountName}
              onChange={this.handleAccountChange}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleOnCreate}
          >
            create default account
          </Button>
        </FlexContainer>
      </React.Fragment>
    );
  }
}
export default AccountCreate;
