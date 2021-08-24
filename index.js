//Query Selectors
var addTodoButton = document.querySelector('#addtodo');
var todoList = document.querySelector(".todo-list");
var todoInput = document.getElementById('inputField');
function getTodos() {
    var todos = null;
    if (localStorage.getItem("todos") != null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    else {
        return;
    }
    var index = 0;
    if (todos != null) {
        todos.forEach(function () {
            var TempTodo = new Todos(todos[index++]);
            TempTodo.addTodo();
        });
    }
}
//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteTodo);
addTodoButton.addEventListener("click", addTodo);
var Todos = /** @class */ (function () {
    function Todos(InTodo) {
        this.title = InTodo;
    }
    Todos.prototype.setTodo = function (todo) {
        this.title = todo;
    };
    Todos.prototype.getTodo = function () {
        return this.title;
    };
    Todos.prototype.saveTodo = function () {
        var todos;
        if (localStorage.getItem('todos') !== null) {
            todos = JSON.parse(localStorage.getItem("todos"));
            todos.push(this.title);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        else {
            todos.push(this.title);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    };
    Todos.prototype.addTodo = function () {
        var todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        var newTodo = document.createElement("li");
        newTodo.innerText = this.getTodo();
        this.saveTodo();
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        var completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class=\"fas fa-check\"></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        var trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class=\"fas fa-trash\"></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    };
    return Todos;
}());
function deletetodo(e) {
    var item = e.target;
    if (item.classList[0] === "trash-btn") {
        // e.target.parentElement.remove();
        var todo_1 = item.parentElement;
        todo_1.classList.add("fall");
        //at the end
        removeLocalTodos(todo_1);
        todo_1.addEventListener("transitionend", function (e) {
            todo_1.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        var todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}
function filterTodo(e) {
    var todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
        }
    });
}
function addTodo() {
    var tempTodo = new Todos(todoInput.value);
    tempTodo.addTodo();
}
