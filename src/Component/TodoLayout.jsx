import React, { useEffect, useRef, useState } from 'react';
import { FcTodoList } from "react-icons/fc";
import TodoItem from './TodoItem';


const TodoLayout = () => {

  const [items , setItems] = useState(localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos")) : []
  );

  const [isEditing , setIsEditing] = useState(false);
  const [editingId , setEditingId] = useState(null);


  const inputRef = useRef();

  const addTask = ()=>{
    const inputText = inputRef.current.value.trim();

    if(inputText === "") return ;
    
    //edit checking
    if(isEditing){
       setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingId ? { ...item, text: inputText } : item
      )
    );
    setIsEditing(false);
    setEditingId(null);

    } else {

      const newItem = {
        id : Date.now(),
        text : inputText , 
        isComplete : false ,
      }
      setItems((prev)=> [...prev , newItem]);
    }

    inputRef.current.value = "" ;
  }


  const updateItem =(id)=>{
    const itemEdit = items.find((item)=> item.id === id);
    if(!itemEdit) return ;

    inputRef.current.value = itemEdit.text;
    setIsEditing(true);
    setEditingId(id);

      setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }


  const deleteItem = (id)=>{
    setItems((prevItems)=>{
      return prevItems.filter((item)=>item.id !== id)
    })
  }


 const markItem = (id)=>{
  setItems((prevItems)=>{
    return prevItems.map((todoItem)=>{
      if(todoItem.id === id){
        return {...todoItem , isComplete : !todoItem.isComplete}
      }

      return todoItem;
    })
  })
 }

  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(items))
  },[items])


  return (
    <div className='place-self-center py-10 px-5 sm:px-7 bg-white w-[95%] sm:w-11/12 max-w-md rounded-xl min-h-[550px] shadow-lg'>

      {/* Header */}
      <div className='flex mb-7 items-center text-blue-900 gap-2 font-semibold text-xl sm:text-2xl'>
        <FcTodoList size={30} className='relative top-0.5'/>
        <h1>To-Do List</h1>
      </div>

      {/* Input + Button */}
      <div className='flex items-center my-7 rounded-full bg-gray-100'>
        <input ref={inputRef} className={`w-[80%] h-14 pl-6 pr-2 bg-transparent rounded-full border-0
               placeholder:text-slate-500  outline-none text-slate-800  `} 
                placeholder='Add your task' 
        />
        <button
              onClick={addTask} 
              className='bg-blue-700 hover:bg-blue-800  rounded-full border-none w-1/3 md:w-32 h-14 text-white md:text-lg 
              font-medium cursor-pointer outline-none'
        >
          {isEditing ? 'Update' : 'ADD +'}
        </button>
      </div>

      {/* Task Items */}
      <div>
        {items.map((item, index) => (
          <TodoItem 
            key={index}
            text={item.text}
            deleteItem={deleteItem}
            id={item.id}
            isComplete={item.isComplete}
            toggle={markItem}
            editItem={updateItem}
          />
        ))}
      </div>

  </div>

  )
}

export default TodoLayout;
