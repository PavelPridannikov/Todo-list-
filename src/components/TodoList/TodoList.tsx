import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ITodo} from "../../models/ModelsTodo";
import TodoItem from "../TodoItem/TodoItem";
import "./style.sass"


interface ITodoListProps{
    items:ITodo[],
    removeTodo:(id:number) => void,
    toggleTodo: (id:number) => void,
}

const TodoList = observer<ITodoListProps>((props) => {
    const {items, removeTodo,toggleTodo} = props
    const [filtered,setFiltered] = useState(items)

    useEffect(() =>{
        setFiltered(items)
    },[items])

    const todoFilter = (completed:"all"|boolean) => {
        if(completed === 'all') {
            setFiltered(items)
        } else {
            const newTodo = [...items].filter(i => i.completed === completed)
            setFiltered(newTodo)
        }
    }

    return (
        <div className="todo-list-container">
            <div className="todo-list__button">
                <button onClick={() => todoFilter('all')}>Все</button>
                <button onClick={() => todoFilter(true)}>Выполненные</button>
                <button onClick={() => todoFilter(false)}>Невыполненные</button>
            </div>
            <div className="todo-list__item">
                {
                    filtered.map(todo => (
                        <TodoItem
                            key={todo.id}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                            {...todo}
                        />
                    ))
                }
            </div>
        </div>
    );
});
export default TodoList;