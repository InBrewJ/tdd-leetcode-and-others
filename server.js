// server.js
const PORT = 8080
const APP_NAME = 'Converge Lite'
const app = require('./src/app')

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}!`)
})
