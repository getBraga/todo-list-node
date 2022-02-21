function corsConfig () {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, GET, POST, PUT, OPTIONS',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-CSRF-token, X-Reque, Origin, Content-Type, Accept',
    'Access-Control-Allow-Credentials': true
  }
  return headers
}

module.exports = corsConfig
