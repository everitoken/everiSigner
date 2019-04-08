/* eslint-disable quotes */
/* eslint-disable semi */
const btn = document.getElementById('sign')
const payload = document.getElementById('payload')

const handleSign = ev => {
  window.everisigner.sign(payload.innerHTML.trim()).then(d => console.log(d))
}

btn.addEventListener('click', handleSign)
