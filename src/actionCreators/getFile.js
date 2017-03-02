"use strict";
const path = require("path");
const fs = require("fs");
const exec = require("child_process").exec;
const promisify = require("es6-promisify");
const readFile = promisify(fs.readFile);
const statFile = promisify(fs.stat);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *      Helpers
 *
 */
function getJsFile(location) {
  return readFile(location, {encoding: 'utf8'});

}

function getNpmZip(npmDir, options={}) {
  const installCmd = options.yarn ? "yarn" : "npm install";
  const name = path.parse(npmDir).base;
  return run(`${installCmd} && zip -r ${name}.zip ./* && mv ${name}.zip ../`, { "cwd": npmDir})
    .then(() => readFile(`${npmDir}.zip`));
}

function run(command, options) {
  return new Promise((ok, fail) => {
    exec(command, options, (err) => {
      if (err)
        fail(err);
      else
        ok();
    });
  });
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *      Exports
 *
 */
module.exports = (fullpath, options={}) => {
  return statFile(fullpath)
    .then(filestat => {
      if (filestat.isDirectory()) {
        return getNpmZip(fullpath, options);
      } else {
        return getJsFile(fullpath);
      }
    })
};
