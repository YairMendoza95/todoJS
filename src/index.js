import "./styles.css";
import { Todo, TodoList } from "./classes";
import { crearTodoHTML } from "./js/componentes";

export const todoList = new TodoList();

console.log(todoList.todos);

// Si el callback solo recibe un argumento se puede omitir la arrow function y solo poner el procedimiento que hara, de esta manera se hace obvio el argumento
todoList.todos.forEach(crearTodoHTML);
