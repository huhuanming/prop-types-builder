import './index.css'
import registerServiceWorker from './registerServiceWorker'
import FormState from './FormState'

registerServiceWorker()
require('./build');
FormState.initialize()

document.getElementById('showDemo').click(() => {
})

document.getElementById('destructure').addEventListener('change', () => {
  FormState.renderOutput()
})

document.getElementById('semicolons').addEventListener('change', () => {
  FormState.renderOutput()
})

document.getElementById('function_wrapper').addEventListener('change', () => {
  FormState.renderOutput()
})

document.getElementById('alphabetize').addEventListener('change', () => {
  FormState.renderOutput()
})

document.getElementById('dangle_commas').addEventListener('change', () => {
  FormState.renderOutput()
})

document.getElementById('required').addEventListener('change', () => {
  FormState.renderOutput()
})

document.getElementById('input').addEventListener('keydown', () => {
  FormState.renderOutput()
})
