//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event) {
  event.preventDefault(); //use to stop refreshing our browser again and again means prevent form from submitting
  //console.log("hello"); -> to check our code works or not!

  //lets make big todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item"); //use this to style our css
  todoDiv.appendChild(newTodo); //so now we have a div with li item
  //ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value); //this values go to function saveLocalTodos

  //check mark button
  const completedButton = document.createElement("button");
  //we can easily do this -> completedButton.innerText =
  //we can use createElement but we can aslo adding tag like belown by using innerHTML
  completedButton.innerHTML = '<i class ="fas fa-check" ></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class ="fas fa-trash" ></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to list
  todoList.appendChild(todoDiv);

  //clear todo input value
  todoInput.value = "";
}

//CREATING THE FUNCTION DELETE CHECK
function deleteCheck(e) {
  //console.log(e.target);//by this we get li and also the buttons in console
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    //item.remove(); -> rather than removing item remove parent element of it
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall"); //transition
    //removeLocalTodos(todo);
    //todo.remove(); -> comment remove to remove direct deletion and can be apply transition
    //but after this only transition applied but other elements stays at there places
    //so
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //checkmark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  //console.log(todos); -> by this whenever we click on arrow then it gives nodelist but we want olny when we click in that options
  todos.forEach(function (todo) {
    //now we can access all individual functions todo
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
        break;
    } //e.target -> is option & value -> all , completed , uncompleted
  });
}

function saveLocalTodos(todo) {
  //console.log("Hello");
  //check ----- hey do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //strig to array/objects
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); //objects/arrays into strings
}

function getTodos() {
  //check --hey do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //strig to array/objects
  }
  todos.forEach(function (todo) {
    //lets make big todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item"); //use this to style our css
    todoDiv.appendChild(newTodo); //so now we have a div with li item

    //check mark button
    const completedButton = document.createElement("button");
    //we can easily do this -> completedButton.innerText =
    //we can use createElement but we can aslo adding tag like belown by using innerHTML
    completedButton.innerHTML = '<i class ="fas fa-check" ></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class ="fas fa-trash" ></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //check --hey do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //strig to array/objects
  }
  //we want to delete element by click and also get deleted from array
  //   console.log(todo.children[0].innerText); //-> by this we get class of todo , chilrens(complete btn, trash btn)
  //   //we done above logic to get index of our element as follows
  //   console.log(todos.indexOf("hello"));
  //instead of above we do
  const todoIndex = todo.children[0].innerText;
  todos.splice(
    todos.indexOf(
      todoIndex
    ) /*argument which tells us from whay position do you want to remove element*/,
    1
  ); //splice() -> is array method which lets you change content of your array by removing or replacing existing elements with new ones.
  localStorage.setItem("todos", JSON.stringify(todos));
}
