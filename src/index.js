"use strict";
const partial = require("lodash.partial");
const actionCreator = require("./actionCreators/creator");

const utils = (openwhisk) => {
  return {
    actions: {
      create: partial(actionCreator, openwhisk)
    }
  }
};

utils.actions = {
  create: actionCreator
};

module.exports = utils;