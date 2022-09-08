import React from 'react';
import {ITodo} from "../../models/ModelsTodo";
import {observer} from "mobx-react-lite";
import "./style.sass"


interface ITodoItem extends ITodo{
    removeTodo:(id:number) => void,
    toggleTodo:(id:number) => void,
}

const TodoItem = observer<ITodoItem>((props) => {
    const {id, completed, title,toggleTodo,removeTodo} = props
    return(
        <div className="todo-item-container">
            <input className="todo-item__input" type="checkbox" checked={completed} onChange={() => toggleTodo(id)}/>
            {title}
            <button className="todo-item__button" onClick={() => removeTodo(id)}>x</button>
        </div>
    )
})


export default TodoItem;