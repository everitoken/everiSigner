import * as React from 'react'
import { Typography, ListItem, ListItemText } from '@material-ui/core'
import { ValidatorType } from '../../types'
import NumberFormat from 'react-number-format'

type PropTypes = {
  validator: ValidatorType
  compact?: boolean
}

export default function ValidatorItem(props: PropTypes) {
  const { validator, compact = false } = props

  return (
    <ListItem>
      <ListItemText
        primary={validator.name}
        secondary={
          <>
            <Typography variant="body2" component="p">
              {compact ? '' : 'Net Value: '}
              <NumberFormat
                className="everitoken-mono"
                displayType={'text'}
                value={validator.current_net_value}
              />
            </Typography>
            {!compact ? (
              <>
                <Typography variant="body2" component="p">
                  Total Value:{' '}
                  <NumberFormat
                    className="everitoken-mono"
                    displayType={'text'}
                    value={validator.total_units}
                    thousandSeparator
                  />{' '}
                  <b>EVT</b>
                </Typography>
                <Typography variant="body2" component="p">
                  Commission: <span>{validator.commission}</span>
                </Typography>
              </>
            ) : null}
          </>
        }
      />
    </ListItem>
  )
}
