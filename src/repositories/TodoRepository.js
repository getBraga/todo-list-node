const { writeFile, readFile } = require('fs/promises')
const { join } = require('path')

const folder = join(__dirname, '../', '../', 'database')

class TodoHepository {
  constructor ({ file }) {
    this.file = join(folder, `${file}.json`)
  }

  async findAll () {
    try {
      const response = JSON.parse(await readFile(this.file))
      return response
    } catch (error) {
      console.error('Deu ruim!!', error)
    }
  }

  async findByID (id) {
    try {
      const response = await JSON.parse(await readFile(this.file))
      if (!id) return null
      const item = response.find(data => data.id === id)
      return item
    } catch (error) {
      console.error('Deu ruim!!', error)
    }
  }

  async update (item) {
    const response = await this.findAll()
    if (!item) return null
    const index = response.findIndex((i) => i.id === item.id)
    response[index] = { ...item }
    await writeFile(this.file, JSON.stringify(response))
    return item
  }

  async create (data) {
    const response = await JSON.parse(await readFile(this.file))
    response.push(data)
    await writeFile(this.file, JSON.stringify(response))
    return data
  }

  async deleteAll () {
    try {
      let response = JSON.parse(await readFile(this.file))
      response = []
      await writeFile(this.file, JSON.stringify(response))
      return response
    } catch (error) {
      console.error('Deu ruim', error)
    }
  }

  async delete (id) {
    try {
      const response = JSON.parse(await readFile(this.file))
      if (!id) return null
      const item = response.find(data => data.id === id)
      if (item) {
        response.splice(response.indexOf(item), 1)
      }
      await writeFile(this.file, JSON.stringify(response))
      return item
    } catch (error) {
      console.error('Deu ruim', error)
    }
  }
}

module.exports = TodoHepository
