const TodoController = require('./../controllers/TodoController')
const todoController = new TodoController('todo')
const routes = {
  'get:/todo': todoController.get.bind(todoController),
  'get:/todos': todoController.index.bind(todoController),
  'put:/todo': todoController.update.bind(todoController),
  'post:/todo': todoController.create.bind(todoController),
  'delete:/todo': todoController.delete.bind(todoController),
  'delete:/todos': todoController.deleteAll.bind(todoController),

  default: (request, response) => {
      response.setHeader('Content-Type', 'text/html');
  response.setHeader('X-Foo', 'bar');
  response.writeHead(404, { 'Access-Control-Allow-Origin': '*' });
 
   
    response.write(JSON.stringify({
      statusCode: 404,
      message: 'Endpoint not found!'
    }))
//     response.writeHead(404)
    return response.end()
  }
}

module.exports = {
  routes,
  todoController
}
