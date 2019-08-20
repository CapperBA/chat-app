const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const bodyParser = require('body-parser');

//middleware function. This code is executed for every request
app.use((req, res, next) => {
  //console.log('Time:', Date.now())
  //console.log('Request Type:', req.method)
  //console.log('Request URL:', req.originalUrl)
  next()
})

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database connection
const db = require('./database/connection')

// models
const Boardgame = require('./models/boardgame')

// routers
const boardgameRouter = require('./routes/boardgameRouter')(Boardgame)

app.get('/', (req, res) => res.send('Welcome to the template api!'))

app.use('/api', boardgameRouter)

app.server = app.listen(port, (err) => {
    if (err) console.log(`[Node] Error running server on port: ${port}`)
    console.log(`[Node] Server started. Listening on port: ${port}`)
})

module.exports = app