import React from 'react';
import './EmptyToDos.css';
import { FaArrowDown } from 'react-icons/fa';

function EmptyToDos({ setOpenModal }) {
  return(
    <div className="EmptyToDos">
      <span className='arrow-down'>
        <FaArrowDown/>
      </span>
      <button className="EmptyToDos-button"
        onClick={
          () => {
            setOpenModal(state => !state)                       
          }
        }
      >
        Add your first To Do
      </button>
    </div>
  );
}


export { EmptyToDos };