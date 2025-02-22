// Storing DOM elements
const todoForm = document.querySelector('.todo-form');
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoName');
const dateInput = document.getElementById('todoDueDate');

// Loading todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Initializing date input
const initializeDateInput = () => {
    const today = new Date();
    dateInput.min = today.toISOString().split('T')[0];
};

// Formatting date for display
const formatDateForDisplay = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
    });
};

// Creating a todo item element
const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const content = document.createElement('div');
    content.className = 'todo-content';

    const name = document.createElement('div');
    name.className = 'todo-name';
    name.textContent = todo.name;

    const date = document.createElement('div');
    date.className = 'todo-date';
    date.textContent = formatDateForDisplay(todo.dueDate);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => removeTodo(index);

    content.appendChild(name);
    content.appendChild(date);
    li.appendChild(content);
    li.appendChild(deleteBtn);

    return li;
};

// Rendering the todo list
const renderTodoList = () => {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        todoList.appendChild(createTodoElement(todo, index));
    });
    saveTodos();
};

// Saving todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Adding a new todo
const handleAddTodo = (event) => {
    event.preventDefault();

    const name = todoInput.value.trim();
    const dueDate = dateInput.value;

    if (!name || !dueDate) {
        alert('Please enter both a task name and due date');
        return;
    }

    todos.push({ name, dueDate });
    todoInput.value = '';

    renderTodoList();
};

// Removing a todo
const removeTodo = (index) => {
    todos.splice(index, 1);
    renderTodoList();
};

// Initializing the app
document.addEventListener('DOMContentLoaded', () => {
    initializeDateInput();
    renderTodoList();
});
