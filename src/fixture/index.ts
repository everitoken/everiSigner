import { AccountStateType } from '../store/reducer/accounts'

export const passwords = ['ooliufei']
export const keys: { [key: string]: { public: string; private: string } } = {
  valid: {
    public: 'EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND',
    private: '5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D',
  },
}
export const accounts: { [key: string]: AccountStateType } = {
  validDefaultDecrypted: {
    id: '6d339a6c-0d1f-462c-863b-dad0cba57fcf',
    name: 'default decrypted',
    type: 'default',
    createdAt: '2019-04-12T14:11:00.263Z',
    privateKey: '5JcRkzh5SqoKM5imCW3Qtnt4Cu7gosR9iiiDtPFh66WjmvK65sM',
    publicKey: 'EVT5Cc5RpTMUWRqvGKgS3KchurXkbF5Q5Et1dFRX7NyCt7WRVmZtS',
    words:
      'liberty coach humble excess sunny adult host visual hammer garbage clinic tonight able motion front vessel develop goat casual lizard differ exchange pottery dice',
  },
  validDefaultEncrypted: {
    id: 'dc7c1663-2a11-49e0-8790-6a3ee5be5c79',
    name: 'default encrypted',
    type: 'default',
    createdAt: '2019-04-12T14:24:23.846Z',
    privateKey:
      '{"iv":"tFIvLQNrvvFqmcdVeB8S2Q==","salt":"u/mDZe32WNY=","ct":"35mALzO+kqTh45sj6YhjVXDG6dljZMO9w1hmmTTGM9xzdEvUEeBg4a26BvazjZKq8YlSA04bQ77PsX4="}',
    publicKey: 'EVT8LySvyikUUGAjcPdnTKTs6EzqUGkfxmVTobtmPYZd4mZqT7c1u',
    words:
      '{"iv":"ebGpqNZRaMrE3HU3VmpyDw==","salt":"u/mDZe32WNY=","ct":"r/eFXoNfQfJMOMYWZ/jlpxyuBja4SrW5BuE0yOwt1vZFpKsAdJv97qZQyNMj12ApwoJaXrzTTVgvNU+QhrMdJk4/nLE8AvTmZXVIRcacNQXTdmpb7O54NNE9xVjuTp4lGNYSJItGKGtxWaGJvWtcIahgInaFE3nvsdSanarIGWZlgBu59YFwMPZZe/A/+fTpBNXCuToYz6+9qWdc"}',
  },
}
