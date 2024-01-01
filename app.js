//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");

//EVENT Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

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
  todoDiv.appendChild(newTodo);
  //so now we have a div with li item

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
    //todo.remove(); -> comment remove to remove direct deletion and can be apply transition
    //but after this only transition applied but other elements stays at there places
    //so
    todo.addEventListener("transitional", function () {
      todo.remove();
    });
  }

  //checkmark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// function filterTodo(e) {
//   const todos = todoList.childNodes;
//   console.log(todos);
// }
