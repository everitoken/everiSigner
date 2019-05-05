import * as React from 'react'

export default ({ children }: { children: React.ReactNode }) => (
  <span className="everitoken-mono" style={{ fontFamily: 'Roboto Mono' }}>
    {children}
  </span>
)
