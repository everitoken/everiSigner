import * as React from 'react'
import { ListItem } from '@material-ui/core'
import ForwardIcon from '@material-ui/icons/ChevronRight'
type CustomListItemType = {
  onClick: () => void
  LeftIcon: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  forward?: boolean
  divider?: boolean
}

const CustomListItem = ({
  LeftIcon,
  children,
  onClick,
  disabled = false,
  forward = true,
  divider = true,
}: CustomListItemType) => {
  return (
    <ListItem divider={divider} button onClick={onClick} disabled={disabled}>
      <div style={{ paddingRight: 16 }}>
        <LeftIcon color="action" />
      </div>
      {children}
      {forward ? (
        <div>
          <ForwardIcon />
        </div>
      ) : null}
    </ListItem>
  )
}

export default CustomListItem
