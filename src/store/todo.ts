import { makeAutoObservable } from "mobx";
import { ITodoItem } from "../types/todo";
class Todo {
  todos = [
    {id: 1, title: "Сходи в магазин", completed: false},
    {id: 2, title: "Посмотреть", completed: false},
    {id: 3, title: "Поставить лайк", completed: false},
  ]
  filter = 'all'
  inAction  = this.todos.filter(todo => !todo.completed)
  done = this.todos.filter(todo => todo.completed)
  items = this.todos
  constructor(){
    makeAutoObservable(this) 
  }
  addTodo(todo: ITodoItem){ 

    this.todos.push(todo)
    this.items = this.todos
    this.inAction  = this.todos.filter(todo => !todo.completed)
    this.done = this.todos.filter(todo => todo.completed)
    this.changeFilter(this.filter)

  }
  removeTodo(id: number){ 
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.items = this.todos
    this.inAction  = this.todos.filter(todo => !todo.completed)
    this.done = this.todos.filter(todo => todo.completed)
    this.changeFilter(this.filter)
  }
  completedTodo(id: number){
    this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    this.items = this.todos
    this.inAction  = this.todos.filter(todo => !todo.completed)
    this.done = this.todos.filter(todo => todo.completed)
    this.changeFilter(this.filter)
  }
  changeFilter(filter: string){
    this.filter = filter
    if(filter === 'all'){
      this.items = this.todos
    }
    if(filter === 'done'){
      this.items = this.done
    }
    if(filter === 'action'){
      
      this.items = this.inAction
    }
  }

}

export default new Todo;