
const FormState = {
  INITIAL_STATE: {
    json: JSON.stringify({
      name: "Bluth Family",
      parents: [
        {name: "George", age: 72},
        {name: "Lucille", age: 68},
      ],
      children: [
        {name: "Michael", age: 45},
        {name: "GOB", age: 41},
        {name: "Lindsay", age: 37},
      ]
    }, undefined, 2),
    alphabetize: true,
    required: true,
  },

  // Persist the state in the URL hash
  saveState: function(state) {
    window.location.hash = escape(JSON.stringify(state))
  },

  // Read form state from the DOM and create a JS object
  readState: function() {
    return {
      json: document.getElementById("input").value,
      function_wrapper: this._readStateSetting("function_wrapper"),
      destructure: this._readStateSetting("destructure"),
      semicolons: this._readStateSetting("semicolons"),
      alphabetize: this._readStateSetting("alphabetize"),
      dangle_commas: this._readStateSetting("dangle_commas"),
      required: this._readStateSetting("required"),
    }
  },

  // Load the state object into the HTML form
  renderState: function(state) {
    document.getElementById("input").value = state.json
    this._renderStateSetting(state, "function_wrapper")
    this._renderStateSetting(state, "destructure")
    this._renderStateSetting(state, "semicolons")
    this._renderStateSetting(state, "alphabetize")
    this._renderStateSetting(state, "dangle_commas")
    this._renderStateSetting(state, "required")
  },

  // Fetch settingName from state and apply it to a same-named checkbox
  _renderStateSetting: function(state, settingName)  {
    document.getElementById(settingName).checked = state[settingName]
  },

  _readStateSetting: function(settingName) {
    return document.getElementById(settingName).checked
  },

  // Render state from the URL hash _or_ the default state
  initialize: function() {
    var initialStateString = unescape(window.location.hash).substr(1)
    var initialState = initialStateString ? JSON.parse(initialStateString) : this.INITIAL_STATE
    this.renderState(initialState)
    this.renderOutput()
  },

  renderOutput: function() {
    var state = this.readState()

    var propTypesContent
    try {
      propTypesContent = Opal.PropTypes.$generate(
        state.json, Opal.hash({
          function_wrapper: state.function_wrapper,
          destructure: state.destructure,
          semicolons: state.semicolons,
          alphabetize: state.alphabetize,
          dangle_commas: state.dangle_commas,
          required: state.required,
        })
      )
      this.saveState(state)
    } catch (err) {
      propTypesContent = err.toString()
    }

    document.getElementById("output").value = propTypesContent
  }
}

export default FormState
