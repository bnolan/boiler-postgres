const pg = require('pg')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const browserify = require('browserify-middleware')
const favicon = require('serve-favicon')
const { queryAndReturn } = require('./lib/postcode')

const app = express()

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools
var client = new pg.Client(process.env.DATABASE_URL || 'postgres://ben@localhost:5432/boiler-postgres')

// connect to our database
client.connect((err) => {
  if (err) throw err
})

// Serve javascript app
app.get('/js/client.js', browserify(path.join(__dirname, 'index.js')))

// Favicons
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

// Public
app.use(express.static('public'))

// Expect json from the client
app.use(bodyParser.json())

// React router urls
const urls = ['/some', '/react-router', '/urls']

urls.forEach((route) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
})

// Some postgres endpoints
app.get('/api/posts/:id', queryAndReturn(client, 'get-post', 'post', (req) => {
  return [req.params.id]
}))

app.get('/api/posts', queryAndReturn(client, 'get-posts', 'post'))

// Start the app
app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port 3000!')
})
