const mongoose = require('mongoose')
const creds = require('./databaseCredentials')

// connection
// if environment is 'Test'
if (process.env.ENV === 'Test') {
  const db = mongoose.connect(`mongodb://${creds.testUsername}:${creds.testPassword}@${creds.testUri}`, { useNewUrlParser: true }, (error) => {
    if (error) console.log(error)
    console.log('[MongoDB Test] Connection to database has been established')  
  })
} else {
  const db = mongoose.connect(`mongodb://${creds.username}:${creds.password}@${creds.uri}`, { useNewUrlParser: true }, (error) => {
    if (error) console.log(error)
    console.log('[MongoDB] Connection to database has been established')
  })
}

// if errors occur after initial connection
mongoose.connection.on('error', (err) => {
  if (err) console.log(`ERROR: ${err}`)
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB] Connection to database has been reestablished')
})