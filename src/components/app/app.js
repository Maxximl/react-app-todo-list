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
       id: this.maxId++,
       matched: 'matched'
      };
   }

    this.state = {
      todoData: [
        this.createItem('Drink Coffe!'),
        this.createItem('Go to walk'),
        this.createItem('Have a lunch')
      ],
      filter: 'active'
    };

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

    this.addItem = (label) => {
      this.setState( ({todoData}) => {
        
      const newData = [...todoData, this.createItem(label)];
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
      });
    };

    this.search = (searchWord) => {
      this.setState(({ todoData }) => {
        const searchedArray = todoData.map( (el) => {

          if(!el.label.includes(searchWord)) {
            el.matched = 'notMatched';
          }
          else {
            el.matched = 'matched';
          }
          return el;
        });
        return {
          todoData: searchedArray
        }
      })
    }

    this.onFilterChanged = (filter) => {
    this.setState({filter});
    }

    this.filtration = (data,filter) => {
      switch(filter) {
        case 'all': return data;
        break;
        case 'active': return data.filter((item) => !item.done);
        break;
        case 'done': return data.filter((item) => item.done);
        break;
        default: return data;
      }
    }
  };


  render() {

    let { todoData,filter } = this.state;
    
    const doneCount = this.state.todoData.filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    const filteredData = this.filtration(todoData, filter);
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.search} />
          <ItemStatusFilter onFilterChanged={this.onFilterChanged}
          filter={filter}/>
        </div>
  
        <TodoList todos={filteredData} filter={this.state.filter}
        onDeleted={ (id) => this.deleteItem(id) }
        onDoneToggled={this.onDoneToggled}
        onImportantToggled={(id)=> this.onImportantToggled(id)} />
        <AddItemForm
        onAddItem={ (label) => this.addItem(label)} />
      </div>
    );
  }
}

