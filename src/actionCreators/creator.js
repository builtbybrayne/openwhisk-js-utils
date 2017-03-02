"use strict";
const path = require("path");
const getFile = require("./getFile");

function exists(ow, actionName) {
  return ow.actions.get({actionName})
    .then(() => true)
    .catch(() => false);
}

function clean(ow, actionName, doClean=false) {
  if (!doClean)
    return Promise.resolve();
  return exists(ow, actionName)
    .then((exists) => (exists) ? ow.actions.delete({actionName}) : Promise.resolve());
}


module.exports = (ow, fullpath, options={}) => {
  const actionName = options.actionName || path.parse(fullpath).name;

  return getFile(fullpath, options)
    .then(action => {
      return clean(ow, actionName, options.clean)
        .then(() => {
          return ow.actions.create({
            actionName,
            action,
            params: options.params || {}
          })
        });
    })


};


