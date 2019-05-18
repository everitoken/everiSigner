import * as React from 'react'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const AddIconButton = (props: { onAdd: () => void }) => (
  <IconButton onClick={props.onAdd}>
    <AddIcon fontSize="large" />
  </IconButton>
)

export default AddIconButton
