/* eslint-disable quotes */
/* eslint-disable semi */
const btn = document.getElementById('sign')
const payload = document.getElementById('payload')

const handleSign = ev => {
  setInterval(() => {
    window.everisigner.sign(payload.innerHTML.trim()).then(d => console.log(d))
  }, 5000)
}

btn.addEventListener('click', handleSign)
