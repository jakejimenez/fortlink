'use strict'

var menubar = require('menubar')

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

var mb = menubar({
  index: winURL,
  icon: '../renderer/assets/images/Favicon_small.png',
  width: 400,
  height: 800,
  preloadWindow: true
})

mb.on('ready', function ready () {
  console.log('Fortlink running v0.1.0')
})
