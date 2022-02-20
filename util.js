function corsConfig ({ method }, nomeMetodo, valorRequicao, response, retornoBody) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE',
    'Access-Control-Allow-Headers': 'X-CSRF-token, X-Reque, Origin, Content-Type, Accept',
    'Access-Control-Allow-Credentials': true
  }
  if ([nomeMetodo].indexOf(method) > -1) {
    response.writeHead(valorRequicao, headers)
  }
}

module.exports = corsConfig
