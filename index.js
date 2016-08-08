var React = require('react')
var RedBox = require('redbox-react').default
var styles = require('redbox-react/lib/style').default

// Custom styles to imitate the Windows BSOD
styles.redbox.background = '#0000A0'
styles.redbox.overflow = 'auto'
styles.redbox.borderRadius = '5% / 50%'
// "redbox-target" is for targeting with CSS as redbox-react doesn't accept a
// className prop. Hacky, but effective.
styles.redbox.fontFamily = "'PerfectDOSVGA', sans-serif, redbox-target"
styles.redbox.padding = '1% 4%'
styles.redbox.boxShadow = 'rgba(255, 255, 255, 0.2) 2em 7em 10em -1em inset, rgba(0, 0, 0, 0.2) -20px -7em 10em -1em inset'
styles.redbox.zIndex = 9998
styles.stack.fontFamily = "'PerfectDOSVGA', monospace"
styles.file.fontSize = '16px'

// Give it that old school CRT pixelated feel
// Thanks to http://codepen.io/lbebber/pen/XJRdrV
var overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
  backgroundSize: '100% 2px, 3px 100%',
  zIndex: 9999,
  pointerEvents: 'none'
}

var BSOD = React.createClass({

  propTypes: RedBox.propTypes,

  componentDidMount: function componentDidMount() {
    // Set a background colour for behind the border-radius
    this._oldBodyBgColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'black';
  },

  componentWillUnmount: function componentWillUnmount() {
    // undo the background colour change
    document.body.style.backgroundColor = this._oldBodyBgColor;
  },

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

          // Target the element with an inline style containing "redbox-target"
          '[style*=redbox-target]:before {' +
          '  content: "A problem has been detected and React has been shut down to prevent damage to your computer.";' +
          '  margin-bottom: 2em;' +
          '}' +

          '[style*=redbox-target]:after {' +
          '  content: "Technical information: \\A\\A *** STOP: 0x000000005 (0x0000000000000000, 0x0000000000000000, 0x0000000000000000, 0x0000000000000000)";' +
          '  margin-top: 2em;' +
          '}' +

          '[style*=redbox-target]:before,' +
          '[style*=redbox-target]:after {' +
          '  white-space: pre;' +
          '  display: block;' +
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
          className: 'foobar'
        }
      )
    )
  }
})

module.exports = BSOD
