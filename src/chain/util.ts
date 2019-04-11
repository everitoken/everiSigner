import ChainApi from '.'

export const getEvtChain = (chainApi: ChainApi) => {
  if (!chainApi) {
    return Promise.reject('Chain api is null.')
  }

  return chainApi.getChain('eos')
}
