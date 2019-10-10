export function pluralize(n, w) {
  return n === 1 ? w : (w + 's');
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export function filteredTodos(todos, type) {
  return filters[type](todos);
}
