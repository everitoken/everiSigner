// initialize everiSigner client
// this client will be init with a tag id, which will be verified in extension

// window.everiSignerClient = {
//   signProvider: () => {
//     window.postMessage(
//       { type: 'everisigner', payload: { type: 'sign', data: 'test' } },
//       '*'
//     )
//   },
// }

// window.addEventListener('message', function(event) {
//   console.log('inject.js', event.data.type)
// })

// window.postMessage(
//   {
//     type: 'everisigner/client',
//     payload: { type: 'ready', data: 'client.is.ready' },
//   },
//   '*'
// )

// window.document.everiSignerClient = msg => {
//   console.log('window.everisigner', msg)
// }

const everiSignerClient = () => {
  //   bridge.getId().then(d => console.log(d))
}

// workflow
//  1. inject.js first fire "client/init-handshake" with a random id (K)
//  2. this message is picked up by content.js and passed along to background.js
//  3. background.js encrypt the K

document.addEventListener('everisigner/init', ev => {
  console.log('inject.js', ev)
})

window.app = everiSignerClient()
