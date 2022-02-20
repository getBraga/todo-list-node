class Todo {
  constructor ({ id, title, description, done, date }) {
    this.id = (Math.floor(Math.random() * 100) + Date.now()).toString()
    this.title = title
    this.description = description
    this.done = done
    this.date = new Date()
  }
}
module.exports = Todo

// const task = {
//   title: 'Arrumar a casa',
//   description: 'Arrumar a casa amanha',
//   done: false
// }

// const hero = new Todo(task)
// console.log(hero)
