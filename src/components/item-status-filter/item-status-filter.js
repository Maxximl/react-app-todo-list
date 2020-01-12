import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

 filterButtons = [
   {
      label: 'All',
      name: 'all'
   },
   {
      label: 'Active',
      name: 'active'
   },
   {
      label: 'Done',
      name: 'done'
   },
 ];


  render() {
    const { filter, onFilterChanged } = this.props;
    const buttons = this.filterButtons.map( (item) => {
      const isActive = filter === item.name;
      let classNames = isActive ? 'btn btn-info' : 'btn btn-outline-secondary';
      const { name, label } = item;


      return (
        <button type="button"
        key={name}
        className={classNames}
        onClick={ () => onFilterChanged(item.name) }>{label}</button>
      )
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  };
}


// const ItemStatusFilter = () => {
//   return (
//     <div className="btn-group">
//       <button type="button"
//               className="btn btn-info">All</button>
//       <button type="button"
//               className="btn btn-outline-secondary">Active</button>
//       <button type="button"
//               className="btn btn-outline-secondary">Done</button>
//     </div>
//   );
// };

// export default ItemStatusFilter;
