// server.js
const PORT = 8080
const APP_NAME = 'Postcode finder'
const app = require('./src/app')

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}!`)
})
