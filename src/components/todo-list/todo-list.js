import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ filter, todos, onDeleted, 
                    onImportantToggled,
                    onDoneToggled }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    let classNames = 'list-group-item ';
    classNames += itemProps.matched;

    return (
      <li key={id} className={classNames}>
        <TodoListItem {...itemProps } 
        onDeleted={ () => onDeleted(id)}
        onImportantToggled={()=> onImportantToggled(id)}
        onDoneToggled={()=>onDoneToggled(id)}
        onEdit/>
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
