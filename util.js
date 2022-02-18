function corsConfig ({ method }, nomeMetodo, valorRequicao, response, retornoBody) {
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET,DELETE, PUT, PATCH'
    // 'Access-Control-Allow-Headers': 'X-CSRF-token, X-Reques',
    // 'Access-Control-Allow-Credentials': true
  }
  if ([nomeMetodo].indexOf(method) > -1) {
    response.writeHead(valorRequicao, headers)
  }
}

module.exports = corsConfig
