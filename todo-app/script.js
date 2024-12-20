const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

let todos = [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    } else {
        todos = [];
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = input.value.trim();
    if (taskText === '') return;

    const newTodo = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    todos.push(newTodo);
    input.value = '';
    saveTodos();
    renderTodos();
});

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.className = 'todo-checkbox';

        checkbox.addEventListener('change', function () {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
            li.style.backgroundColor = '#b7ffb5';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.className = 'delete-button';

        deleteButton.addEventListener('click', function () {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

loadTodos();
renderTodos();
