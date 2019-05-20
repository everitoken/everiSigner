import ChainApi from '.'

export const getEvtChain = (chainApi: ChainApi, network?: {}) => {
  if (!chainApi) {
    return Promise.reject('Chain api is null.')
  }

  return chainApi.getChain('everitoken', network)
}
