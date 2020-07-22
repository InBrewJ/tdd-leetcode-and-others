var https = require('https')

const ENDPOINT_API = '{{secret}}'
const ENDPOINT_PATH = '{{secret}}'
const API_KEY = '{{secret}}'
const AUTH_HEADER = '{{x-api-key}}'

var options = {
  headers: {
    'x-api-key': API_KEY
  },
  host: ENDPOINT_API,
  path: ENDPOINT_PATH
}

function get(req, res) {
  console.log(req.params)
  // add our postcode validation (later)

  // contact ENDPOINT_API with a postcode from req.params using http

  try {
    let hackneyAPIReq = https.get(options, (apiRes) => {
      console.log('STATUS: ' + apiRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(apiRes.headers))
      //   console.log('After hreq: ', apiRes)

      // Buffer the body entirely for processing as a whole.
      var bodyChunks = []
      apiRes.on('end', function () {
        var body = Buffer.concat(bodyChunks)
        console.log('BODY: ' + body)
        // Response from OUR endpoint
        res.json({
          data: {
            addresses: ['anything']
          }
        })
      })
    })
  } catch (e) {
    console.error('error! ', e)
    res.json({
      error: 'Could not contact the Hackney API'
    })
  }

  // return the response from ENDPOINT_URL as our response
}

module.exports = {
  get
}
