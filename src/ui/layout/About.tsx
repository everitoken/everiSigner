import * as React from 'react'
import { ReactReduxContext } from 'react-redux'

export default class extends React.PureComponent {
  componentDidMount() {
    console.log(window.location)
  }
  render() {
    return (
      <React.Fragment>
        <h1>About</h1>
        <ul>
          <li>Tech stack</li>
          <li>Purpose of everiSigner</li>
          <li>Contribute, GitHub</li>
        </ul>
      </React.Fragment>
    )
  }
}
