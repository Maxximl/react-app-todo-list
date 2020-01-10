import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from '../add-item-form';

import './app.css';

export default class App extends Component {
  
  constructor() {
    super();

    this.maxId = 100;
    this.createItem = (label) => {
      return {
       label,
       done: false,
       important:false,
       id: this.maxId++
      };
   }

    this.state = {
      todoData: [
        this.createItem('Drink Coffe!'),
        this.createItem('Go to walk'),
        this.createItem('Have a lunch')
      ]
    }

    this.deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
          ...todoData.slice(0, idx), 
          ...todoData.slice(idx + 1)
        ]
        return {
          todoData: newArray
        }

      })
    }

    this.addItem = () => {
      this.setState( ({todoData}) => {
        
      const newData = [...todoData, this.createItem('dummy')];
      return {
        todoData: newData
      }
      } )
    }

    this.onImportantToggled = (id) => {

      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, important: !oldItem.important};
        
        const newArray = [
          ...todoData.slice(0, idx), 
          newItem,
          ...todoData.slice(idx + 1)
        ]
        return {
          todoData: newArray
        };
      })
    }

    this.onDoneToggled = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, done: !oldItem.done};
        
        const newArray = [
          ...todoData.slice(0, idx), 
          newItem,
          ...todoData.slice(idx + 1)
        ]
        return {
          todoData: newArray
        };
      })
    }
  }

  render() {

    let { todoData } = this.state;
    
    const doneCount = this.state.todoData.filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList todos={todoData} 
        onDeleted={ (id) => this.deleteItem(id) }
        onDoneToggled={this.onDoneToggled}
        onImportantToggled={(id)=> this.onImportantToggled(id)} />
        <AddItemForm
        onAddItem={ () => this.addItem()} />
      </div>
    );
  }
}
