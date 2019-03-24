const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');

const World = function() {
  scope.host = 'http://todomvc.com/examples/react/#/';
  scope.driver = puppeteer;
  scope.context = {};
};

setWorldConstructor(World);
