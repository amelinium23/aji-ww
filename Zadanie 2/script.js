"use strict";
let todoList = [];
let initList = function () {
  todoList.push(
    {
      title: "Learn JS",
      description: "Create a demo application for my TODO's",
      place: "445",
      dueDate: new Date(2019, 10, 16),
    },
    {
      title: "Lecture test",
      description: "Quick test from the first three lectures",
      place: "F6",
      dueDate: new Date(2019, 10, 17),
    }
  );
};
initList();
let updateTodoList = function () {
  let todoListDiv = document.getElementById("todoListView");
  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }
  for (let todo in todoList) {
    let newElement = document.createElement("div");
    let newContent = document.createTextNode(
      todoList[todo].title + " " + todoList[todo].description
    );
    newElement.appendChild(newContent);
    todoListDiv.appendChild(newElement);
  }
};

setInterval(updateTodoList, 1000);
