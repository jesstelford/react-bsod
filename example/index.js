var React = require('react')
var ReactDOM = require('react-dom')
var BSOD = require('../')

// A component which throws an error
var Foo = React.createClass({
  render: function render() {
    this.props()
  }
})

try {

  // Will throw an error
  ReactDOM.render(React.createElement(Foo), document.querySelector('.container'))

} catch(err) {

  ReactDOM.render(
    React.createElement(BSOD, {error: err}),
    document.querySelector('.container')
  )

/**
 * Alternatively with JSX:

  ReactDOM.render(
    <BSOD error={err}>,
    document.querySelector('.container')
  )

 */
}
