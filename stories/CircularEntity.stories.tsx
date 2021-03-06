import * as React from 'react'
import CircularEntity from '../src/ui/presentational/CircularEntity'
import ConnectedEntities from '../src/ui/presentational/ConnectedEntities'

import { storiesOf } from '@storybook/react'
import { Button, Fab, Link } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

storiesOf('CircularEntity', module).add('default', () => (
  <CircularEntity title="demo page" subtitle="https://google.de" />
))

storiesOf('CircularEntity', module).add('withAction', () => (
  <CircularEntity
    title="demo page"
    subtitle="https://google.de"
    renderAction={({ title, subtitle }) => (
      <Button variant="outlined" color="secondary" size="small">{`${title.slice(
        0,
        1
      )} - ${subtitle.slice(0, 1)}`}</Button>
    )}
  />
))

storiesOf('CircularEntity', module).add('long text', () => (
  <CircularEntity
    title="demo page with long text"
    subtitle="https://google.de/with-veriy-long-url"
  />
))

storiesOf('CircularEntity', module).add('without subtitle', () => (
  <CircularEntity title="demo page with long text" subtitle="required" />
))

storiesOf('CircularEntity', module).add('renderAvatar', () => (
  <CircularEntity
    title="demo page with long text"
    subtitle="this is a subtitle"
    renderAvatar={({ title }) => <p>{title.substring(0, 2)}</p>}
  />
))

storiesOf('CircularEntity', module).add('connected entities', () => {
  const left = (
    <CircularEntity title="demo page with long text" subtitle="subtitle" />
  )
  const right = (
    <CircularEntity
      title="demo page"
      subtitle="https://google.de"
      renderAction={({ title, subtitle }) => (
        <Link className="circular-entity-link" variant="body2">
          {' '}
          (change?)
        </Link>
      )}
    />
  )
  return <ConnectedEntities left={left} right={right} />
})
