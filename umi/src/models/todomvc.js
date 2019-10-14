import { getTodos } from '../commons/storage';

const namespace = 'todomvc';
const state = {
  todos: getTodos(),
  todosChanged: 0
};

const reducers = {
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


const effects = {
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
    const { todos } = yield select(state => state.todomvc);
    yield put({
      type: 'updateTodos',
      payload: todos.map((todo) => {
        return { text: todo.text, done: allChecked };
      })
    });
  },

  *clearCompleted(context, { put, select }) {
    let { todos } = yield select(state => state.todomvc);
    yield put({ type: 'updateTodos', payload: todos.filter(todo => !todo.done) });
  }
}

export default {
  namespace,
  state,
  reducers,
  effects
};
