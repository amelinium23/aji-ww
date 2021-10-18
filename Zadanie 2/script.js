"use strict";
let todoList = [];

$.ajax({
  url: "https://api.jsonbin.io/b/6162a90aaa02be1d445747f8/latest",
  type: "GET",
  headers: {
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

let updateJSONbin = () => {
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
      console.log(data);
      todoList = data.data;
    },
    error: (err) => {
      console.log(err.responseJSON);
    },
  });
};

let deleteTodo = (index) => {
  todoList.splice(index, 1);
  updateJSONbin();
};

let createNewTableRow = (todo, index) => {
  let rowElement = $("<tr></tr>");
  $(`<td>${todo.title}</td>)`).appendTo(rowElement);
  $(`<td>${todo.description}</td>`).appendTo(rowElement);
  $(`<td>${todo.place}</td>`).appendTo(rowElement);
  $(`<td>${new Date(todo.dueDate).toLocaleDateString()}</td>`).appendTo(
    rowElement
  );
  $(`<td><input type="button" class="btn btn-danger" value="x" /></td>`)
    .click(() => deleteTodo(index))
    .appendTo(rowElement);
  return rowElement;
};

let updateTodoList = () => {
  let todoListTable = $("#todoTableBody");
  let titleValue = $("#inputSearch").val();
  let toDateValue = new Date($("#toDateSearch").val());
  let fromDateValue = new Date($(`#fromDateSearch`).val());
  $(`tr:not(:first)`).remove();
  for (let todo in todoList) {
    if (
      (titleValue == "" ||
        todoList[todo].title.includes(titleValue) ||
        todoList[todo].description.includes(titleValue)) &&
      (isNaN(Date.parse(fromDateValue)) ||
        new Date(todoList[todo].dueDate) >= fromDateValue) &&
      (isNaN(Date.parse(toDateValue)) ||
        new Date(todoList[todo].dueDate) <= toDateValue)
    ) {
      const newElement = createNewTableRow(todoList[todo], todo);
      todoListTable.append(newElement);
    }
  }
};
setInterval(updateTodoList, 1000);

let addTodo = () => {
  let newTitle = $("#inputTitle").val();
  let newDescription = $("#inputDescription").val();
  let newPlace = $("#inputPlace").val();
  let newDate = new Date($("#inputDate").val()).toISOString();
  let newTodo = {
    title: newTitle,
    description: newDescription,
    place: newPlace,
    dueDate: newDate,
  };
  todoList.push(newTodo);
  updateJSONbin();
};
