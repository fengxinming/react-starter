import React, { Component } from 'react';
import map from 'celia/map';
import { observer } from 'mobx-react';
import { pluralize, capitalize, filteredTodos } from '../../utils';
import TodoItem from '../TodoItem';


const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: 'all',
    }
  }

  addTodo = (e) => {
    if ((e.switch || e.keyCode) === 13) {
      const text = e.target.value;
      if (text.trim()) {
        this.$store.addTodo(text);
      }
      e.target.value = '';
    }
  }

  onSetVisibility(key) {
    this.setState({
      visibility: key
    });
  }

  render() {
    const { visibility } = this.state;
    const { todos } = this.$store;
    const len = todos.length;
    const { remaining, allChecked } = this.$store.computedTodos;

    const TodoItemsView = (
      filteredTodos(todos, visibility).map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
        />
      ))
    );

    const FilterItemsView = (
      map(filters, (val, key) => (
        <li key={key}>
          <a href={'#/' + key}
            className={visibility === key ? 'selected' : ''}
            onClick={() => this.onSetVisibility(key)}>{capitalize(key)}</a>
        </li>
      ))
    );

    return (
      <section className="todoapp">
        {/* <!-- header --> */}
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo"
            autoFocus
            autoComplete="off"
            placeholder="What needs to be done?"
            onKeyUp={this.addTodo} />
        </header>

        {/* <!-- main section --> */}
        <section className="main" style={{ display: len ? 'block' : 'none' }}>
          <input
            className="toggle-all"
            id="toggle-all"
            type="checkbox"
            checked={allChecked}
            onChange={() => this.$store.toggleAll(!allChecked)} />
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list">
            {TodoItemsView}
          </ul>
        </section>

        {/* <!-- footer --> */}
        <footer className="footer" style={{ display: len ? 'block' : 'none' }}>
          <span className="todo-count">
            <strong>{remaining}</strong>
            {pluralize(remaining, ' item')} left
          </span>
          <ul className="filters">
            {FilterItemsView}
          </ul>
          <button
            className="clear-completed"
            style={{ display: len > remaining ? 'inline' : 'none' }}
            onClick={this.$store.clearCompleted}>Clear completed</button>
        </footer>
      </section >
    );
  }
}

export default App;
