const http = require('http')
const { routes } = require('./../src/routes/Todo')

const PORT = process.env.PORT || 4000

const handler = (request, response) => {
  const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
      /** add other headers as per requirement */
    };

    if (request.method === "OPTIONS") {
      request.writeHead(204, headers);
      response.end();
      return;
    }

    if (["GET", "POST"].indexOf(request.method) > -1) {
      response.writeHead(200, headers);
      response.end("Hello World");
      return;
    }

    response.writeHead(405, headers);
    response.end(`${request.method} is not allowed for the request.`);
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
