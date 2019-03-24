const { Given, When, Then } = require("cucumber");

const { visitUrl, noTodos, writeTodo, submit, todoInList } = require('./actions');

Given("I visit the todos page", visitUrl);

Given("I have no todos initially", noTodos);

When("I write the todo {string} in the input field", writeTodo);

When("I click enter", submit);

Then("I expect to see the todo {string} in the list", todoInList);
