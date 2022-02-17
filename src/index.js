const http = require('http')
const { routes } = require('./../src/routes/Todo')

let server
const PORT = process.env.PORT || 4000

const handler = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        response.setHeader('Access-Control-Allow-Headers', '*');
    
    require('./helper-request').parseJsonBody(req, res).then(data => {
        console.log(JSON.stringify(data));
    });
    switch (req.method) {
        case 'GET':
            // some code here
            break;
        case 'POST':
            // some code here
            break;
        default:
            // some code here
    }
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

server = HttpService.createServer(serverCallback, false);
server.listen(PORT, () => {
    console.log('Executando servidor na porta ' + PORT + '!');
});
//  http.createServer(handler).listen((PORT), () => {
  
//   console.log('service running at', PORT)
// })



