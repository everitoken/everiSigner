/* eslint-disable quotes */
/* eslint-disable semi */
const btn = document.getElementById('sign')
const getSupportedActionsBtn = document.getElementById('supportedactions')
const getAccountsButton = document.getElementById('getaccounts')
const payload = document.getElementById('payload')

const privateKey = '5J1by7KRQujRdXrurEsvEr2zQGcdPaMJRjewER6XsAR2eCcpt3D'
const publicKey = EVT.EvtKey.privateToPublic(privateKey) // EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND

const network = {
  host: 'testnet1.everitoken.io',
  port: 443,
  protocol: 'https',
}

const handlePush = ev => {
  const apiCaller = EVT({
    endpoint: network,
    signProvider: everisigner.createSignProvider({
      message: 'test message',
      addresses: [publicKey],
    }),
  })

  apiCaller
    .pushTransaction(
      { maxCharge: 10000, payer: publicKey },
      new EVT.EvtAction('transferft', {
        from: publicKey,
        to: 'EVT6rn1vVAM8FfdT43Ast37yHqwRhoZkLpbxZXEtodJLYFFGA7Qzq',
        number: '0.00001 S#20',
        memo: 'Test',
      }),
      new EVT.EvtAction('transferft', {
        from: publicKey,
        to: 'EVT6rn1vVAM8FfdT43Ast37yHqwRhoZkLpbxZXEtodJLYFFGA7Qzq',
        number: '0.00002 S#20',
        memo: 'another transfer',
      })
    )
    .then(trx => console.log('trx: ', trx))
}

btn.addEventListener('click', handlePush)

getSupportedActionsBtn.addEventListener('click', () => {
  everisigner.getSupportedActions().then(actions => console.log(actions))
})

getAccountsButton.addEventListener('click', () => {
  everisigner.getAccounts().then(accounts => console.log(accounts))
})
