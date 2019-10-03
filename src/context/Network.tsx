import * as React from 'react'
import { noop } from 'lodash'
import useNetwork, { NETWORKS, DEFAULT_NETWORK } from '../hooks/useNetwork'


export const NetworkContext = React.createContext({
  networks: NETWORKS,
  selected: DEFAULT_NETWORK,
  selectNetwork: noop,
  addNetwork: noop,
  removeNetwork: noop,
})

type PropTypes = {
  children: React.ReactNode
}

let selectedNetworkCached = DEFAULT_NETWORK

export default function NetworkContextProvider(props: PropTypes) {
  const [
    networks,
    selected,
    selectNetwork,
    addNetwork,
    removeNetwork,
  ] = useNetwork()

  selectedNetworkCached = selected

  return (
    <NetworkContext.Provider
      value={{
        networks,
        selected,
        selectNetwork,
        addNetwork,
        removeNetwork,
      }}
    >
      {props.children}
    </NetworkContext.Provider>
  )
}

// TODO: Think of refactoring
export const getSelectedNetwork = () => {
  return selectedNetworkCached
}
