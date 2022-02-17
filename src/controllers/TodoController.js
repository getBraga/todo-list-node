const TodoRepository = require('./../repositories/TodoRepository')

const Todo = require('./../entities/Todo')

class TodoController {
  constructor (filename) {
    this.todoRepository = new TodoRepository({ file: filename })
  }

  async index (request, response) {
    try {
      const todos = JSON.stringify(await this.todoRepository.findAll())
      const { method } = request
      const headers = { 'Access-Control-Allow-Origin': '*' }
      //   ,
      //   { key: 'Access-Control-Allow-Methods', vale: 'OPTIONS, POST, GET' },
      //   { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-token, X-Reques' },
      //   { key: 'Access-Control-Allow-Credentials', value: true }
      // ]

      if (method === 'OPTIONS') {
        response.writeHead(204, headers)
        return response.end(todos)
      }
      if (['GET'].indexOf(method) > -1) {
        response.writeHead(200, headers)
        return response.end(todos)
      }
      response.writeHead(405, headers)
      response.end(`${method} is not allowed for the request.`)
      response.write(todos)
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }

  async get (request, response) {
    try {
      const todo = JSON.stringify(await this.todoRepository.findByID(request.itemId))

      if (!todo) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        return response.end(JSON.stringify({ message: 'Todo not found!' }))
      };
      response.write(todo)
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }

  async create (request, response) {
    try {
      // eslint-disable-next-line no-unreachable-loop
      for await (const data of request) {
        const { title, description, done = false } = JSON.parse(data)

        if (!title || !description) {
          response.writeHead(400, { 'Content-Type': 'application/json' })
          return response.end(JSON.stringify({ message: 'Invalid body!' }))
        }
        const todo = new Todo({ title, description, done })
        await this.todoRepository.create(todo)
        response.write(JSON.stringify(todo))
        return response.end()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async delete (request, response) {
    try {
      const todo = JSON.stringify(await this.todoRepository.delete(request.itemId))

      if (!todo) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        return response.end(JSON.stringify({ message: 'Todo not found!' }))
      };
      response.write(JSON.stringify(todo))
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }

  async deleteAll (request, response) {
    try {
      const todos = JSON.stringify(await this.todoRepository.deleteAll())
      response.write(todos)
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }
}
module.exports = TodoController
