"use strict";
const path = require("path");
const openwhisk = require("openwhisk");
const root = path.join(__dirname, "../");

const ow = openwhisk({
  apihost: '192.168.33.13',
  // Change to your key here
  api_key: '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP',
  ignore_certs: true
});

const utils = require(path.join(root, "src/index"))(ow);


const js = utils.actions.create(path.join(root, "testActions/testJsAction.js"), {}, {clean: true})
  .then(result => console.log("JS Action Created"))
  .catch(err => console.error("JS Action Failed", err));

const npm = utils.actions.create(path.join(root, "testActions/testNpmAction"), {}, {clean: true})
  .then(result => console.log("Npm Action Created"))
  .catch(err => console.error("Npm Action Failed", err));


Promise.all([js, npm]).then(() =>{
  ow.actions.list()
    .then(rs => rs.forEach(r => console.log("-", r.name)));

  ow.actions.invoke({
      actionName: "testNpmAction",
      blocking: true,
      params: {
        "a": "b",
        "c": "d"
      }
  })
    .then(x => console.log(x.response.result))
    .catch(e => console.error("testNpmAction failed", e))


  ow.actions.invoke({
    actionName: "testJsAction",
    blocking: true,
    params: {
      "p": "q",
      "r": "s"
    }
  })
    .then(x => console.log(x.response.result))
    .catch(e => console.error("testNpmAction failed", e))

});
