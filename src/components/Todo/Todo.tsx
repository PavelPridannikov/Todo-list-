import React, {useEffect, useRef, useState} from 'react';
import {ITodo} from "../../models/ModelsTodo";
import {observer} from "mobx-react-lite";
import TodoList from "../TodoList/TodoList";
import "./style.sass"

const Todo = observer (() => {
    const [value,setValue] = useState('');
    const [todos, setTodos] = useState<ITodo[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const  addTodo = () => {
        if (value){
            setTodos([...todos,{
                id:Date.now(),
                title:value,
                completed:false
            }])
            setValue('')
        }
    }

    const removeTodo = (id:number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const toggleTodo = (id:number): void => {
        setTodos(todos.map(todo => todo.id === id ? {...todo,completed:!todo.completed} : todo))
    }

    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        setValue(e.target.value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) =>{
        if (e.key === 'Enter') addTodo()
    }

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    },[])

    return (
        <div className="todo-add-container">
            <div className="todo-add-flex-container">
                <div className="todo-add_form">
                    <h1>Todo List</h1>
                    <input
                        type="text"
                        value={value}
                        placeholder="Введите задачу..."
                        onChange={handleChange}
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        />
                    <button
                        onClick={addTodo}>
                        Добавить задачу
                    </button>
                </div>
                <TodoList items={todos} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
            </div>
        </div>
    );
})

export default Todo;