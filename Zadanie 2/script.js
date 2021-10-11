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
      console.log("sent new todoList => " + data.data);
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

let createNewTableRow = (todo) => {
  let rowElement = $("<tr></tr>");
  $(`<td>${todo.title}</td>)`).appendTo(rowElement);
  $(`<td>${todo.description}</td>`).appendTo(rowElement);
  $(`<td>${todo.place}</td>`).appendTo(rowElement);
  $(`<td>${todo.dueDate}</td>`).appendTo(rowElement);
  $(`<td><input type="button" class="btn btn-danger" value="x" /></td>`)
    .click((todo) => deleteTodo(todo))
    .appendTo(rowElement);
  return rowElement;
};

let updateTodoList = function () {
  let todoListTable = $("#todoTableBody");
  let titleValue = $("#inputSearch").val();
  let dateValue = new Date($("dateSearch").val());
  for (let todo in todoList) {
    if (
      titleValue == "" ||
      todoList[todo].title.includes(titleValue) ||
      todoList[todo].description.includes(titleValue) ||
      todoList[todo].dueDate.includes(dateValue)
    ) {
      const newElement = createNewTableRow(todoList[todo]);
      todoListTable.append(newElement);
    }
  }
};

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
updateTodoList();

// setInterval(updateTodoList, 2100);
