import { createAction, createReducer } from '@reduxjs/toolkit';
import { Todo } from '../todo.type.ts';

export enum VisibilityFilter {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}
interface TodoState {
  todos: Todo[];
  filter: VisibilityFilter;
  filteredTodos: Todo[]; 
}

const initialState: TodoState = {
  todos: [],
  filter: VisibilityFilter.SHOW_ALL,
  filteredTodos: []
};

export const addTodo = createAction<Todo>("todo/addTodo")
export const deleteTodo = createAction<string>("todo/deleteTodo")
export const setFilter = createAction<VisibilityFilter>("todo/setFilter")

const todoReducer = createReducer(initialState,(builder)=>{
  builder
  .addCase(addTodo,(state,action)=>{
    const todo = action.payload
    state.todos.push(todo)
  })
  .addCase(deleteTodo,(state,action)=>{
    const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed ;
      return state;
  })
  .addCase(setFilter,(state,action)=>{
    state.filter = action.payload;
      switch (action.payload) {
        case VisibilityFilter.SHOW_ACTIVE:
          state.filteredTodos = state.todos.filter(todo => !todo.completed);
          break;
        case VisibilityFilter.SHOW_COMPLETED:
          state.filteredTodos = state.todos.filter(todo => todo.completed);
          break;
        default:
          state.filteredTodos = state.todos;
          break;
      }
  })
})
export default todoReducer
