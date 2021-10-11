"use strict";
let todoList = [];

$.ajax({
  // copy Your bin identifier here. It can be obtained in the dashboard
  url: "https://api.jsonbin.io/b/6162a90aaa02be1d445747f8/latest",
  type: "GET",
  headers: {
    //Required only if you are trying to access a private bin
    "secret-key":
      "$2b$10$Vh8O/VTaKC88yeAXXUohmutj1KNGVnU47h5kLtdcVFfStrBW2xq9e",
  },
  success: (data) => {
    console.log(data);
    todoList = data;
  },
  error: (err) => {
    console.log(err.responseJSON);
  },
});

let updateJSONbin = function () {
  $.ajax({
    url: "https://api.jsonbin.io/b/6162a90aaa02be1d445747f8",
    type: "PUT",
    headers: {
      "secret-key":
        "$2b$10$Vh8O/VTaKC88yeAXXUohmutj1KNGVnU47h5kLtdcVFfStrBW2xq9e",
    },
    contentType: "application/json",
    data: JSON.stringify(todoList),
    success: (data) => {
      // console.log(data);
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
};

setInterval(updateTodoList, 1000);

let addTodo = function () {
  //get the values from the form
  let newTitle = $("#inputTitle").val();
  let newDescription = $("#inputDescription").val();
  let newPlace = $("#inputPlace").val();
  let newDate = new Date($("#inputDate").val());
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
