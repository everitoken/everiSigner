function* promptSaga() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('feifeifeifei')
    if (request.greeting == 'hello') {
      alert('fei')
      sendResponse({ farewell: 'goodbye' })
    }
  })
}

export default promptSaga
