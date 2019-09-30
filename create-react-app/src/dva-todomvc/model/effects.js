export default {
  *addTodo({ payload: text }, { put }) {
    yield put({ type: 'addTodo2', payload: { text, done: false } });
  },

  *removeTodo({ payload: todo }, { put }) {
    yield put({ type: 'removeTodo2', payload: todo });
  },

  *toggleTodo({ payload: todo }, { put }) {
    yield put({
      type: 'updateTodo',
      payload: {
        todo,
        newTodo: { text: todo.text, done: !todo.done }
      }
    });
  },

  *editTodo({ payload: { todo, value } }, { put }) {
    yield put({
      type: 'updateTodo',
      payload: {
        todo,
        newTodo: { text: value, done: todo.done }
      }
    });
  },

  *toggleAll({ payload: allChecked }, { put, select }) {
    const { todos } = yield select(state => state.mvc);
    yield put({
      type: 'updateTodos',
      payload: todos.map((todo) => {
        return { text: todo.text, done: allChecked };
      })
    });
  },

  *clearCompleted(context, { put, select }) {
    let { todos } = yield select(state => state.mvc);
    yield put({ type: 'updateTodos', payload: todos.filter(todo => !todo.done) });
  }
}
