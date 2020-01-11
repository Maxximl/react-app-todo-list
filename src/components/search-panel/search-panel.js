import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  onTextChange = (e) => {
     this.props.onSearch(e.target.value);
     console.log("work");
  }

  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search" 
                onChange={this.onTextChange}/>
    );
  }
};


