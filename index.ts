//Query Selectors
const addTodoButton = document.querySelector('#addtodo');
const todoList = document.querySelector(".todo-list");
let todoInput = document.getElementById('inputField') as HTMLInputElement;

function getTodos(){
    let todos:string[] = null;
    if(localStorage.getItem("todos")!= null){
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    else{
        return;
    }

    let index : number = 0;
    if(todos!=null){
    todos.forEach(function(){
        const TempTodo = new Todos(todos[index++]);
        TempTodo.addTodo();
    })
}
}
//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoList.addEventListener("click",deleteTodo);
addTodoButton.addEventListener("click",addTodo);

class Todos {
    public title : string;

    constructor(InTodo : string) {
          this.title = InTodo;
    }
    setTodo(todo:string){
        this.title=todo;
    }
    getTodo():string{
        return this.title;
    }
    saveTodo(){
        let todos : string [];
        if(localStorage.getItem('todos')!==null){
            todos = JSON.parse(localStorage.getItem("todos"));
            todos.push(this.title);
            localStorage.setItem("todos", JSON.stringify(todos));
        }else{
            todos.push(this.title);
            localStorage.setItem("todos",JSON.stringify(todos));
        }
    }
    addTodo(){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = this.getTodo();
        this.saveTodo();

        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    }
    


}
function deletetodo(e:any){
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
          todo.remove();
        });
      }
      if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
      }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
  }  
function addTodo(){

    const tempTodo = new Todos(todoInput.value);
    tempTodo.addTodo();
    


}