const TodoRepository = require('./../repositories/TodoRepository')

const Todo = require('./../entities/Todo')

class TodoController {
  constructor (filename) {
    this.todoRepository = new TodoRepository({ file: filename })
  }

  async index (request, response) {
    try {
      response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
      const todos = JSON.stringify(await this.todoRepository.findAll())
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
