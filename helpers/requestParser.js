const { Op } = require('sequelize')
const SUPPORTED_PARAMS = ['sensorId', 'since', 'until']

const processQueryParams = (req = {}) => {
  const { query = null } = req
  if (!query) return undefined

  const clauses = SUPPORTED_PARAMS.map((param) => {
    if (param in query) {
      switch (param) {
        case 'sensorId':
          return {
            sensorId: query[param]
          }
        case 'since':
          return {
            time: {
              [Op.gte]: query[param]
            }
          }
        case 'until':
          return {
            time: {
              [Op.lte]: query[param]
            }
          }
      }
    }
  }).filter(Boolean)

  if (clauses.length > 1) {
    return {
      where: {
        [Op.and]: clauses
      }
    }
  }

  return clauses.length
    ? {
        where: clauses[0]
      }
    : undefined
}

const requestToFilter = (req) => {
  return processQueryParams(req)
}

module.exports = {
  requestToFilter
}
