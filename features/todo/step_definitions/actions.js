const { expect } = require('chai');
const scope = require('../../support/scope');

// Defines whether puppeteer runs Chrome in headless mode.
let headless = true;
let slowMo = 0;
// Chrome is set to run headlessly and with no slowdown in CircleCI
if (process.env.CIRCLECI) headless = true;
if (process.env.CIRCLECI) slowMo = 0;

const pending = callback => {
  callback(null, 'pending');
};

const visitUrl = async () => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({ headless, slowMo });
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  return await scope.context.currentPage.goto(scope.host, {
    waitUntil: 'networkidle2'
  });
};

const noTodos = async () => {
  const { currentPage } = scope.context;
  const todos = await currentPage.$('ul.todo-list');
  expect(todos).to.eql(null);
};

const writeTodo = async (todo) => {
  const { currentPage } = scope.context;
  const inputElement = await currentPage.$('input.new-todo');
  await inputElement.type(todo);
};

const submit = async () => {
  const { currentPage } = scope.context;
  const inputElement = await currentPage.$('input.new-todo');
  await inputElement.press('Enter');
};

const todoInList = async (todo) => {
  const selector = 'ul.todo-list li label';
  const { currentPage } = scope.context;
  await currentPage.waitForSelector(selector);
  // await currentPage.screenshot({ path: 'buddy-screenshot.png' });
  const todoLabel = await currentPage.evaluate(s => document.querySelector(s).innerText, selector);
  expect(todo).to.eql(todoLabel);
};

module.exports = {
  pending,
  visitUrl,
  noTodos,
  writeTodo,
  submit,
  todoInList,
};
