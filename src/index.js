const http = require('http')
const { routes } = require('./../src/routes/Todo')

const PORT = process.env.PORT || 4000

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

const server =  http.createServer(handler).listen((PORT), () => {
  
  console.log('service running at', PORT)
})


server.on("request", function (request, response) {
	console.log(`METHOD: ${request.method}; URL: ${request.url}`);
	switch(request.method)
	{
	case "GET":
	case "PUT":
	case "POST":
	case "PATCH":
	case "DELETE":
		response.writeHead(200, {
			"Content-Type":"application/json",
			"Access-Control-Allow-Origin":"http://localhost:3000", // REQUIRED CORS HEADER
			"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
		});
		response.end(JSON.stringify({dummy:"dummy"}));
		break;
	case "OPTIONS": // THE CLIENT OCCASIONALLY - NOT ALWAYS - CHECKS THIS
		response.writeHead(200, {
			"Access-Control-Allow-Origin":"*", // REQUIRED CORS HEADER
			"Access-Control-Allow-Methods":"GET, POST, DELETE, PUT, PATCH", // REQUIRED CORS HEADER
			"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
		});
		response.end();
		break;
	default:
		response.writeHead(405, {
			"Content-Type":"application/json"
		});
		response.end(JSON.stringify({error:`method ${request.method} not allowed`}));
		break;
	}
});
