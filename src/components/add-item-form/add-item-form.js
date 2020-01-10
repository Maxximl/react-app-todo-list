import React from 'react';

import './add-item-form.css'
const AddItemForm = (props) => {
    return (
        <form className="add-item-form" >
            <input type='text' className='form-control'></input>
            <button className="btn btn-outline-secondary"
            onClick={props.onAddItem} >
                Add Item
            </button>
        </form>
    )
}

export default AddItemForm;