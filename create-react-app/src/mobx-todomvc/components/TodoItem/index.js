import React, { PureComponent } from 'react';

class TodoItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      text: ''
    };
  }

  cancelEdit = () => {
    this.setState({ editing: false, text: '' });
  }

  onEditDone = () => {
    const value = this.state.text;
    const { todo } = this.props;

    if (this.state.editing) {
      if (!value) {
        this.$store.removeTodo(todo);
      } else if (todo.text !== value) {
        this.$store.updateTodo(todo, {
          text: value
        });
      }
      this.cancelEdit();
    }
  }

  onEdit = () => {
    this.setState({ editing: true, text: this.props.todo.text }, () => {
      this.refs.textField.focus();
    });
  }

  onEnter = (e) => {
    switch (e.switch || e.keyCode) {
      case 13: // Enter
        this.onEditDone(e);
        break;
      case 27: // Esc
        this.cancelEdit(e);
        break;
      default:
    }
  }

  onChangeInput = (e) => {
    this.setState({ text: e.target.value });
  }

  onToggleTodo(todo) {
    this.$store.updateTodo(todo, { done: !todo.done });
  }

  render() {
    const { todo } = this.props;
    const { editing } = this.state;
    return (
      <li className={'todo' + (todo.done ? ' completed' : '' + (editing ? ' editing' : ''))}>
        <div className="view">
          <input className="toggle"
            type="checkbox"
            checked={todo.done}
            onChange={() => this.onToggleTodo(todo)} />
          <label onDoubleClick={this.onEdit}>{todo.text}</label>
          <button className="destroy" onClick={() => this.$store.removeTodo(todo)}></button>
        </div>
        <input className="edit"
          ref="textField"
          style={{ display: editing ? 'inline' : 'none' }}
          onChange={this.onChangeInput}
          value={this.state.text}
          onKeyUp={this.onEnter}
          onBlur={this.onEditDone} />
      </li>
    );
  }
}

export default TodoItem;
