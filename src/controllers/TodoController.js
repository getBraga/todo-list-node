const TodoRepository = require('./../repositories/TodoRepository')
const util = require('./../../util')
const Todo = require('./../entities/Todo')

class TodoController {
  constructor (filename) {
    this.todoRepository = new TodoRepository({ file: filename })
  }

  async index (request, response) {
    try {
      const todos = JSON.stringify(await this.todoRepository.findAll())
      await util(request, 'GET', 200, response, todos)
      response.write(todos)
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      await util(request, 'GET', 404, response, JSON.stringify({ message: 'Internal server error!' }))
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }

  async get (request, response) {
    try {
      const todo = JSON.stringify(await this.todoRepository.findByID(request.itemId))
      await util(request, 'GET', 200, response, todo)
      if (!todo) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        await util(request, 'GET', 404, response, todo)
        return response.end(JSON.stringify({ message: 'Todo not found!' }))
      };
      response.write(todo)
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      await util(request, 'GET', 200, response, JSON.stringify({ message: 'Internal server error!' }))
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }

  async create (request, response) {
    try {
      // eslint-disable-next-line no-unreachable-loop
      for await (const data of request) {
        const { title, description, done = false } = JSON.parse(data)
        const todo = new Todo({ title, description, done })
        if (!title || !description) {
          response.writeHead(400, { 'Content-Type': 'application/json' })
          await util(request, 'POST', 400, response, todo)
          return response.end(JSON.stringify({ message: 'Invalid body!' }))
        }
        await util(request, 'POST', 201, response, todo)
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
      await util(request, 'DELETE', 201, response, todo)
      if (!todo) {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        await util(request, 'DELETE', 404, response, todo)
        return response.end(JSON.stringify({ message: 'Todo not found!' }))
      };
      response.write(JSON.stringify(todo))
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      const todo = JSON.stringify({ message: 'Internal server error!' })
      await util(request, 'DELETE', 500, response, todo)
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }

  async deleteAll (request, response) {
    try {
      const todos = JSON.stringify(await this.todoRepository.deleteAll())
      await util(request, 'DELETE', 200, response, todos)
      response.write(todos)
      return response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      await util(request, 'DELETE', 500, response)
      return response.end(JSON.stringify({ message: 'Internal server error!' }))
    }
  }
}
module.exports = TodoController
