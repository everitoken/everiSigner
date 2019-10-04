import * as React from 'react'
import { noop } from 'lodash'
import useNetworks, { NETWORKS, DEFAULT_NETWORK } from '../hooks/useNetworks'

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
    getSelected,
    selectNetwork,
    addNetwork,
    removeNetwork,
  ] = useNetworks(NETWORKS)

  const selected = getSelected()
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
