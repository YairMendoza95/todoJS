import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector(".todo-list");
const txtTodo = document.querySelector(".new-todo");
const btnCompletdos = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = todo => {
    const todoHTML = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${
        todo.id
        }">
		<div class="view">
			<input class="toggle" type="checkbox" ${
        todo.completado ? "checked" : ""
        }>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement("div");
    div.innerHTML = todoHTML;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

txtTodo.addEventListener("keyup", event => {
    if (event.keyCode === 13 && txtTodo.value.length > 0) {
        const nuevoTodo = new Todo(txtTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);

        txtTodo.value = "";
    } else if (txtTodo.value.length === 0) {
        alert("El campo no debe estar vacío");
    }
});

divTodoList.addEventListener("click", event => {
    const elemento = event.target.localName; // Obtiene el nombre de la etiqueta HTML a la que se le dio click
    const todoElemento = event.target.parentElement.parentElement; // Cada parentElement sube un nivel en el arbol de etiquetas HTML
    const todoId = todoElemento.getAttribute("data-id"); // Obtiene el id del registro por medio del atributp

    if (elemento.includes("input")) {
        // Evalúa si la etiqueta a la que se ledió click es un input
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed"); // Agrega una clase CSS
    } else if (elemento.includes("button")) {
        // Evalúa si la etiqueta a la que se le dió click es un botón
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento); // Remueve el HTML del elemento que se haya seleccionado
    }
});

btnCompletdos.addEventListener("click", () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains("completed")) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if (!filtro) return;

    anchorFiltros.forEach(eleM => eleM.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) elemento.classList.add('hidden');
                break;
            case 'Completados':
                if (!completado) elemento.classList.add('hidden');
                break;
        }
    }
});