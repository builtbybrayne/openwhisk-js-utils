'use strict';
const path = require("path");
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const sinon = require("sinon");
require("sinon-as-promised");
chai.use(require("sinon-chai"));
const nock = require("nock");

const utilsLoader = require("../src/index");
const actions = require("../src/index").actions;

console.log("!!!!!!!!!");
console.log("");
console.log("Sorry, I haven't yet mocked the openwhisk server, so tests are manual via `manual-test.js`. Feel free to contribute!");
console.log("");
console.log("!!!!!!!!!");


describe.skip('openwhisk-utils', function() {
  it('Should be tested', () => {});
});

