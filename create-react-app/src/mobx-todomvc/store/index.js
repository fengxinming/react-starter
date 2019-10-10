import { observable, computed, action, autorun, toJS } from 'mobx';

export const STORAGE_KEY = 'todos-react';

class MVCStore {
  constructor() {
    autorun(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toJS(this.todos)))
    });
  }

  @observable todos = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')

  @computed get computedTodos() {
    const { todos } = this;
    const len = todos.length;
    let remaining = 0;
    let allChecked = 0;
    todos.forEach((todo) => {
      allChecked += todo.done ? 1 : 0;
      remaining += todo.done ? 0 : 1;
    });
    allChecked = allChecked === len;
    return { remaining, allChecked };
  }

  @action addTodo(text) {
    this.todos.push({ text, done: false });
  }

  @action removeTodo(todo) {
    const { todos } = this;
    const index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1);
    }
  }

  @action updateTodo(todo, additional) {
    const { todos } = this;
    const index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1, Object.assign({}, todo, additional));
    }
  }

  @action toggleAll(allChecked) {
    this.todos = this.todos.map(todo => ({ text: todo.text, done: allChecked }));
  }

  @action.bound clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.done);
  }
}

export default new MVCStore();
