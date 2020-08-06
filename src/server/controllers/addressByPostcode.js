var https = require('https')

const API_KEY = process.env.GET_ADDRESS_IO_API_KEY

function get(req, ourResponse) {
  console.log(req.query.PostCode)
  const queryPostCode = req.query.PostCode
  // add our postcode validation (later)

  // contact ENDPOINT_API with a postcode from req.params using https

  let ENDPOINT_API = `https://api.getAddress.io/find/${queryPostCode}?api-key=${API_KEY}`

  try {
    https.get(ENDPOINT_API, (apiRes) => {
      console.log('STATUS: ' + apiRes.statusCode)

      let data = ''

      // A chunk of data has been recieved.
      apiRes.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      apiRes.on('end', () => {
        ourResponse.json({
          data
        })
      })
    })
  } catch (e) {
    console.error('error! ', e)
    ourResponse.json({
      error: 'Could not contact getAddress.io'
    })
  }
}

module.exports = {
  get
}
