import * as React from 'react'

export default ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'Roboto Mono', padding: '0 5px' }}>
    {children}
  </span>
)
