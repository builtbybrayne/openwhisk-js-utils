# openwhisk-js-utils 

> Some js utils to help with tasks not offered as part of the official SDK

This is really just a very lightweight helper for the official SDK. It's not a wrapper per se, but rather provides a few handy abstractions for workflows I find myself using a lot.

## Install

```
$ yarn add openwhisk-utils
```

or

```
$ npm install --save openwhisk-utils
```

## Environment

I try to write code directly for nodejs6 without needing a transpiler.

## Usage

You can either initialise the entire `utils` package or on a per-function basis.

a) Via initialisation function:

```
const openwhisk = require("openwhisk")();

const owutils = require("openwhisk-utils")(openwhisk);
owutils.actions.create(actionLocation).then(...);
```

b) Per-function basis

```
const openwhisk = require("openwhisk")();

const osactions = require("openwhisk-utils").actions;
actions.create(openwhisk, actionLocation).then(...);
```

### Creating Actions

This just helps wrap a workflow for zipping up an npm package and uploading it to OpenWhisk. It also handles js files as is.

**NB** The location must be an absolute path. For relative links use `let location = require('path').join(__dirname, "./relative/location")`;

#### Function signature

```
ow_utils.actions.create(absolutePath, options={});
```

#### Options

##### Custom Name

Actions are by default named after the js file or the directory name of the package. If you wish to specify a name use 

```
{
    actionName: "myName"
}
```

##### Deleting Existing Action 

You can delete the action first if it exists. This makes it easier to overwrite actions.

```
{
    clean: true
}
```

##### Default params

*NB* This is not supported officially by the SDK at the time of writing. I hacked my openwhisk to allow it, but there is [a pull request to fix this](https://github.com/openwhisk/openwhisk-client-js/pull/26).

```
params: {
    "a": 1,
    ...
}
```


##### Yarn vs Npm Install

By default, dependencies are installed via `npm install`, but you can also choose to use `yarn` instead:

```
{
    yarn: true
}
```



#### Examples

##### Overwrite action from JsFiles

```
const jsfile = "/some/js/file.js"
ow_utils.actions.create(jsfile, {clean: true}).then(...);
```

##### NPM Package built via Yarn with some default params   

Given a package at `/some/npm/package/` which looks like the below, this will install the dependencies and then zip the directory ready for upload.


```
/some/npm/package/
  |-  index.js
  |-  package.json
  |-  yarn.lock
```

We'll also add some default params:

```
const npmDir = "/some/npm/package"
ow_utils.actions.create(npmDir, {
    yarn: true,
    params: {"redis_host": "redis.example.com"}
}).then(...);
```


## Testing

I haven't got round to mocking the openwhisk requests, so at the moment there is just a `test/manual-test.js` file which you can use to verify it works for yourself. Sorry, I know, bad form.




## License

MIT © [Alastair Brayne]
