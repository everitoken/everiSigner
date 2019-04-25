import * as React from 'react'

export default ({ children }: { children: React.ReactNode }) => (
  <span className="everitoken-mono" style={{ padding: '0 5px' }}>
    {children}
  </span>
)
