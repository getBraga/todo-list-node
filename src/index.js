const http = require('http')
const { routes } = require('./../src/routes/Todo')

const PORT = process.env.PORT || 4000

http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000// 30 days
    /** add other headers as per requirement */
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, headers)
    res.end('Hello World')
    return
  }

  res.writeHead(405, headers)
  res.end(`${req.method} is not allowed for the request.`)
}).listen(PORT)

const handler = (request, response) => {
  const { url, method } = request
  let routeKey = `${method.toLowerCase()}:${url}`
  const [,, id] = routeKey.split('/')

  const logRequest = `-> New request ${routeKey}`
  console.log('\x1b[33m', logRequest)

  routeKey = id ? routeKey.replace(`/${id}`, '') : routeKey
  const chosen = routes[routeKey] || routes.default

  request.itemId = id
  response.writeHead(200, { 'Content-Type': 'application/json' })

  return chosen(request, response)
}

http.createServer(handler).listen((PORT), () => {
  console.log('service running at', PORT)
})
