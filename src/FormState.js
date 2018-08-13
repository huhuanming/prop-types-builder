
const FormState = {
  INITIAL_STATE: {
    json: JSON.stringify({
      name: 'Bluth Family',
      parents: [
        { name: 'George', age: 72 },
        { name: 'Lucille', age: 68 },
      ],
      children: [
        { name: 'Michael', age: 45 },
        { name: 'GOB', age: 41 },
        { name: 'Lindsay', age: 37 },
      ],
    }, undefined, 2),
    alphabetize: true,
    required: true,
  },

  // Persist the state in the URL hash
  saveState(state) {
    window.location.hash = escape(JSON.stringify(state))
  },

  // Read form state from the DOM and create a JS object
  readState() {
    return {
      json: document.getElementById('input').value,
      function_wrapper: this.readStateSetting('function_wrapper'),
      destructure: this.readStateSetting('destructure'),
      semicolons: this.readStateSetting('semicolons'),
      alphabetize: this.readStateSetting('alphabetize'),
      dangle_commas: this.readStateSetting('dangle_commas'),
      required: this.readStateSetting('required'),
    }
  },

  // Load the state object into the HTML form
  renderState(state) {
    document.getElementById('input').value = state.json
    this.renderStateSetting(state, 'function_wrapper')
    this.renderStateSetting(state, 'destructure')
    this.renderStateSetting(state, 'semicolons')
    this.renderStateSetting(state, 'alphabetize')
    this.renderStateSetting(state, 'dangle_commas')
    this.renderStateSetting(state, 'required')
  },

  // Fetch settingName from state and apply it to a same-named checkbox
  renderStateSetting(state, settingName) {
    document.getElementById(settingName).checked = state[settingName]
  },

  readStateSetting(settingName) {
    return document.getElementById(settingName).checked
  },

  // Render state from the URL hash _or_ the default state
  initialize() {
    const initialStateString = unescape(window.location.hash).substr(1)
    const initialState = initialStateString ? JSON.parse(initialStateString) : this.INITIAL_STATE
    this.renderState(initialState)
    this.renderOutput()
  },

  renderOutput() {
    const state = this.readState()

    let propTypesContent
    try {
      propTypesContent = Opal.PropTypes.$generate(
        state.json, Opal.hash({
          function_wrapper: state.function_wrapper,
          destructure: state.destructure,
          semicolons: state.semicolons,
          alphabetize: state.alphabetize,
          dangle_commas: state.dangle_commas,
          required: state.required,
        }),
      )
      this.saveState(state)
    } catch (err) {
      propTypesContent = err.toString()
    }

    document.getElementById('output').value = propTypesContent
  },
}

export default FormState
