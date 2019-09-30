export default {
  addTodo2(state, { payload }) {
    // state.todos = state.todos.concat(payload);
    state.todos.push(payload);
    state.todosChanged++;
    return state;
  },

  removeTodo2(state, { payload }) {
    const { todos } = state;
    const index = todos.indexOf(payload);
    if (index === -1) {
      // 不触发组件更新
      return false;
    }
    // state.todos = todos.slice(0, index).concat(todos.slice(index + 1));
    state.todos.splice(index, 1);
    state.todosChanged--;
    return state;
  },

  updateTodo(state, { payload: { todo, newTodo } }) {
    const { todos } = state;
    const index = todos.indexOf(todo);
    // state.todos = todos.slice(0, index).concat(newTodo, todos.slice(index + 1));
    state.todos.splice(index, 1, newTodo);
    state.todosChanged--;
    return state;
  },

  updateTodos(state, { payload: newTodos }) {
    state.todos = newTodos;
    return state;
  }
}
