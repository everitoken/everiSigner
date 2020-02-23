import * as React from 'react'
import { NetworkItemType } from '../../types'
import {
  Dialog,
  IconButton,
  Divider,
  DialogContent,
  List,
  ListItem,
  Radio,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import NetworkListItem from './NetworkListItem'
import { isSameNetwork } from '../util'
import labels from '../../labels'
import { APP_BAR_HEIGHT, padding } from '../../style'
import { HeaderTitle } from './MainLayout'

type NetworkSelectionModalPropTypes = {
  open: boolean
  handleClose: Function
  networks: NetworkItemType[]
  selected: NetworkItemType
  handleSelect: (network: NetworkItemType) => void
}

function NetworkSelectionDialog(props: NetworkSelectionModalPropTypes) {
  return (
    <Dialog fullScreen open={props.open}>
      <div
        style={{
          padding: `0 ${padding.standard}px`,
          height: APP_BAR_HEIGHT,
          display: 'flex',
          alignContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <HeaderTitle title={labels.NETWORK_SELECT} />
        <IconButton onClick={() => props.handleClose()}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <DialogContent>
        <List>
          {props.networks.map(network => (
            <ListItem
              key={network.url}
              role={undefined}
              dense
              disableGutters
              button
              onClick={() => props.handleSelect(network)}
            >
              <Radio
                checked={isSameNetwork(network, props.selected)}
                tabIndex={-1}
                value={network.name}
                name="select-network"
              />
              <NetworkListItem network={network} compact />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default NetworkSelectionDialog
