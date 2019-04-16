/* eslint-disable quotes */
/* eslint-disable semi */
const btn = document.getElementById('sign')
const getSupportedActionsBtn = document.getElementById('supportedactions')
const payload = document.getElementById('payload')

const privateKey = '5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D'
const publicKey = EVT.EvtKey.privateToPublic(privateKey)

const network = {
  host: 'testnet1.everitoken.io',
  port: 443,
  protocol: 'https',
}

const handlePush = ev => {
  const apiCaller = EVT({
    endpoint: network,
    signProvider: everisigner.createSignProvider({ message: 'test message' }),
  })

  apiCaller
    .pushTransaction(
      { maxCharge: 10000, payer: publicKey },
      new EVT.EvtAction('newdomain', {
        name: 'testCreateDomain5',
        creator: publicKey,
        issue: {
          name: 'issue',
          threshold: 1,
          authorizers: [
            {
              ref: '[A] ' + publicKey,
              weight: 1,
            },
          ],
        },
        transfer: {
          name: 'transfer',
          threshold: 1,
          authorizers: [
            {
              ref: '[G] .OWNER'
              weight: 1,
            },
          ],
        },
        manage: {
          name: 'manage',
          threshold: 1,
          authorizers: [
            {
              ref: '[A] ' + publicKey,
              weight: 1,
            },
          ],
        },
      })
    )
    .then(trx => console.log('trx: ', trx))
}

btn.addEventListener('click', handlePush)
getSupportedActionsBtn.addEventListener('click', () => {
  everisigner.getSupportedActions().then(actions => console.log(actions))
})
