import React from 'react'
import { GoCheckCircleFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";


const TodoItem = ({text , id , isComplete , deleteItem , toggle }) => {
  return (
    <div className='flex justify-between items-center my-5'>
        <div className='flex items-center gap-1.5 cursor-pointer' onClick={()=>{toggle(id)}}>
            {isComplete ? 
                <GoCheckCircleFill color='#1447e6' size={23} />
            :
                <ImRadioUnchecked color='#1447e6' size={23} />

            }
            <p className={`text-slate-800 pr-1 wrap-anywhere text-base decoration-slate-400 ${isComplete ? 'line-through' : ""}`}>{text}</p>
        </div>
        <MdDelete color='#E52020' size={23} className='cursor-pointer' onClick={()=>{deleteItem(id)}}/>
        

    </div>
  )
}

export default TodoItem
