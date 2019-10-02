import * as React from 'react'
import { Dialog, DialogContent, IconButton } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountSelectList from './AccountSelectList'
import labels from '../../labels'
import { APP_BAR_HEIGHT } from '../../style'
import { HeaderTitle } from './MainLayout'
import CloseIcon from '@material-ui/icons/Close'
import * as style from '../../style'
import Divider from './Divider'

type PropTypes = {
  selected: AccountStateType
  accounts: AccountStateType[]
  children: ({ handleOpen }: { handleOpen: () => void }) => React.ReactNode
  onSelect: (account: AccountStateType) => void
  onAccountMoreClicked?: (account: AccountStateType) => void
  detailComponent?: React.ReactNode
}


export default function AccountSelect(props: PropTypes) {
  const [selected, setSelected] = React.useState(props.selected)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSelect = (account: AccountStateType) => {
    setSelected(account)
    setOpen(false)
    if (selected.id !== account.id) {
      props.onSelect(account)
    }
  }

  const renderSelectAccount = () => {
    if (!open) {
      return null
    }

    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div
          style={{
            padding: `0 ${style.padding.standard}px`,
            height: APP_BAR_HEIGHT,
            display: 'flex',
            alignContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HeaderTitle title={labels.ACCOUNT_SELECT} />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <DialogContent>
          <AccountSelectList
            accounts={props.accounts}
            selected={selected}
            onSelect={handleSelect}
            onMoreClicked={props.onAccountMoreClicked || undefined}
          />
          {props.detailComponent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <React.Fragment>
      {renderSelectAccount()}
      {props.children({ handleOpen })}
    </React.Fragment>
  )
}
