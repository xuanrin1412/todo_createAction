import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { VisibilityFilter, addTodo, setFilter } from './features/todo_CreateAction';
import { Todo } from './todo.type';

const initialState: Todo = {
    id: "",
    text: "",
    completed: false
}

const TodoForm: React.FC = () => {
    const [todo, setTodo] = useState<Todo>(initialState);
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo.text.trim() !== '') {
            const todoWithId = { ...todo, id: new Date().toISOString() }
            dispatch(addTodo(todoWithId));
            dispatch(setFilter(VisibilityFilter.SHOW_ALL));
            setTodo(initialState);
        }
        setTodo(initialState)
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='drop-shadow-lg'>
            <input
                type="text"
                value={todo.text}
                onChange={(e) => setTodo(prev => ({ ...prev, text: e.target.value }))}
                placeholder="What needs to be done?"
                className="rounded-md p-3 w-full"
                onKeyPress={handleKeyPress}
            />
        </form>
    );
};

export default TodoForm;
