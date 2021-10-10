"use strict";
let todoList = [];

let updateJSONbin = function () {
  $.ajax({
    url: "https://api.jsonbin.io/b/61629d2b9548541c29c10234",
    type: "PUT",
    headers: {
      "secret-key":
        "$2b$10$iCTFXKQZOYOAfV1tELk6AuMoPwH2XlHg1cSKHHX77SDvJLnvFxAoS",
    },
    contentType: "application/json",
    data: JSON.stringify(todoList),
    success: (data) => {
      console.log(data);
      todoList = data.data;
    },
    error: (err) => {
      console.log(err.responseJSON);
    },
  });
};

let deleteTodo = function (index) {
  todoList.splice(index, 1);
  updateJSONbin();
};

let updateTodoList = function () {
  let todoListDiv = document.getElementById("todoListView");
  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }
  let filterInput = document.getElementById("inputSearch");
  for (let todo in todoList) {
    if (
      filterInput.value == "" ||
      todoList[todo].title.includes(filterInput.value) ||
      todoList[todo].description.includes(filterInput.value)
    ) {
      let newElement = document.createElement("p");
      let newContent = document.createTextNode(
        todoList[todo].title + " " + todoList[todo].description
      );
      newElement.appendChild(newContent);
      todoListDiv.appendChild(newElement);
      let newDeleteButton = document.createElement("input");
      newDeleteButton.type = "button";
      newDeleteButton.value = "x";
      newDeleteButton.className = "btn btn-danger";
      newDeleteButton.addEventListener("click", function () {
        deleteTodo(todo);
      });
      todoListDiv.appendChild(newDeleteButton);
    }
  }
  updateJSONbin();
};

setInterval(updateTodoList, 2000);

let addTodo = function () {
  //get the elements in the form
  let inputTitle = document.getElementById("inputTitle");
  let inputDescription = document.getElementById("inputDescription");
  let inputPlace = document.getElementById("inputPlace");
  let inputDate = document.getElementById("inputDate");
  //get the values from the form
  let newTitle = inputTitle.value;
  let newDescription = inputDescription.value;
  let newPlace = inputPlace.value;
  let newDate = new Date(inputDate.value);
  //create new item
  let newTodo = {
    title: newTitle,
    description: newDescription,
    place: newPlace,
    dueDate: newDate,
  };
  //add item to the list
  todoList.push(newTodo);
  updateJSONbin();
};

let filterInput = document.getElementById("inputSearch");
for (let todo in todoList) {
  if (
    filterInput.value == "" ||
    todoList[todo].title.includes(filterInput.value) ||
    todoList[todo].description.includes(filterInput.value)
  ) {
    let newElement = document.createElement("p");
    let newContent = document.createTextNode(
      todoList[todo].title + " " + todoList[todo].description
    );
    newElement.appendChild(newContent);
    todoListDiv.appendChild(newElement);
  }
}
