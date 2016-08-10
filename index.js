var React = require('react')
var ReactDOM = require('react-dom')
var RedBox = require('redbox-react').default
var styles = require('redbox-react/lib/style').default

// Custom styles to imitate the Windows BSOD
styles.redbox = {
  transform: 'translateZ(0)', // Trigger super fast GPU rendering mode
  boxSizing: 'border-box',
  fontFamily: 'PerfectDOSVGA, sans-serif',
  padding: '1% 4%',
  color: 'white',
  zIndex: '9998',
  textAlign: 'left',
  fontSize: '16px',
  lineHeight: '1.2',
  background: 'rgb(0, 0, 160)'
}

styles.stack.fontFamily = "'PerfectDOSVGA', monospace"
styles.file.fontSize = '16px'

var overlayStyles = {

  // Make this a rounded-corner transparent box
  position: 'fixed',
  boxSizing: 'content-box', // So we can size just the content, excluding the border
  width: '100vw', // Set the content size to fill the screen
  height: '100vh',

  // Curved edges roughly like what a CRT looked like
  borderRadius: '5% / 50%',

  // Inner shadow to give a slight rounded effect
  boxShadow: 'rgba(255, 255, 255, 0.2) 2em 7em 10em -1em inset,' +
    'rgba(0, 0, 0, 0.2) -20px -7em 10em -1em inset,' +

    // makes the black outline of the "CRT", leaving the box to be transparent
    'black 0 0 0 100vw',

  // Give it that old school CRT pixelated feel
  // Thanks to http://codepen.io/lbebber/pen/XJRdrV
  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
  backgroundSize: '100% 2px, 3px 100%',

  // Make sure it's on top
  zIndex: 9999,

  // But doesn't capture the mouse
  pointerEvents: 'none',
}

var BSODError = React.createClass({

  propTypes: RedBox.propTypes,

  render: function render() {
    return React.createElement(
      'div',
      {style: overlayStyles},
      React.createElement(
        'style',
        {dangerouslySetInnerHTML: {__html:
          /**
           * http://www.dafont.com/perfect-dos-vga-437.font
           * by Zeh Fernando
           */
          '@font-face {' +
          '  font-family: PerfectDOSVGA;' +
          '  src: url("https://npmcdn.com/react-bsod/static/perfect-dos-vga-437.ttf");' +
          '  font-weight: 400;' +
          '}' +

          '.redbox-target:before {' +
          '  content: "A problem has been detected and React has been shut down to prevent damage to your computer.";' +
          '  margin-bottom: 2em;' +
          '}' +

          '.redbox-target:after {' +
          '  content: "Technical information: \\A\\A *** STOP: 0x000000005 (0x0000000000000000, 0x0000000000000000, 0x0000000000000000, 0x0000000000000000)";' +
          '  margin-top: 2em;' +
          '}' +

          '.redbox-target:before,' +
          '.redbox-target:after {' +
          '  white-space: pre;' +
          '  display: block;' +
          '}' +

          // Override any applied styles to ensure our component displays
          // correctly
          'body, html {' +
          '  padding: 0 !important;' +
          '  margin: 0 !important;' +
          '}' +

          'body > .bsod-hidden {' +
          '  display: none !important;' +
          '}'
        }}
      ),
      React.createElement(
        RedBox,
        {
          style: styles,
          error: this.props.error,
          filename: this.props.filename,
          editorScheme: this.props.editorScheme,
          useLines: this.props.useLines,
          useColumns: this.props.useColumns,
          className: 'redbox-target'
        }
      )
    )
  }
})

var BSOD = React.createClass({

  propTypes: BSODError.propTypes,

  componentDidMount: function componentDidMount() {

    // Hide any other elements so we're guaranteed to be the only thing on the
    // page
    this.otherBodyEls = Array.prototype.slice.apply(document.querySelectorAll('body > *'))
    this.otherBodyEls.forEach(function(el) {
      el.className += ' bsod-hidden'
    })

    this.el = document.createElement('div')
    document.body.appendChild(this.el)
    this.renderBSODError()
  },

  componentDidUpdate: function componentDidUpdate() {
    this.renderBSODError()
  },

  componentWillUnmount: function componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.el)
    document.body.removeChild(this.el)
    this.el = null

    // Un-hide any other elements
    this.otherBodyEls.forEach(function(el) {
      el.className = el.className.replace(
        new RegExp('\\s?\\bbsod-hidden\\b', 'g'),
        ''
      )
    })
  },

  renderBSODError: function renderBSODError() {
    ReactDOM.render(React.createElement(BSODError, this.props), this.el)
  },

  render: function render() {
    return null
  }

})

module.exports = BSOD
