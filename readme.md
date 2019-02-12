# reducer-tester

[![Build Status](https://travis-ci.org/akameco/reducer-tester.svg?branch=master)](https://travis-ci.org/akameco/reducer-tester)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

> reducer tester

See [how-to-test-reducers](https://github.com/akameco/how-to-test-reducers)

## Install

```
$ yarn add --dev reducer-tester
```

## Usage

```js
// reducer.js
export const initialState = { count: 0, other: 'other' }

export default (state = initialState, action) => {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + 1 }
    case 'dec':
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}

// reducer.test.js
import reducerTester from 'reducer-tester'
import reducer, { initialState } from './reducer'

reducerTester({
  reducer,
  state: initialState,
  tests: [{ type: 'inc' }, { type: 'dec' }],
})
```

### Snapshot

```diff
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`handle initial state 1`] = `
"Snapshot Diff:
Compared values have no visual difference."
`;

exports[`dec 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
-   "count": 0,
+   "count": -1,
    "other": "other",
  }"
`;

exports[`inc 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
-   "count": 0,
+   "count": 1,
    "other": "other",
  }
`;
```

## Full example

```js
import reducerTester from 'reducer-tester'
import reducer, { initialState } from './reducer'

reducerTester({
  reducer, // #required
  state: initialState, // #required
  tests: [{ type: 'inc' }, { type: 'dec' }], // #required
  initialTest: false, // # optional, default: true
  titlePrefix: 'handle ', // # optional, default: ''
})
```

```diff
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`handle dec 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
-   "count: 0,
+   count: -1,
  }
`;

exports[`handle inc 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
-   count: 0,
+   count: 1,
  }
`;
```

### Tips

#### Atom Editor User

Install `language-diff` and `file-types`. And open `config.json` and edit as blow.

```cson
"*":
  "file-types":
    "\\.js\\.snap$": "source.diff"
```

Hooray! Very readable!

![68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f31353331392f64666537363137312d323735322d646265302d613038652d6330633436646330396264662e706e67 (495×575)](https://camo.qiitausercontent.com/d621872e2fedd535ccdb694170499d2ee7031080/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f31353331392f64666537363137312d323735322d646265302d613038652d6330633436646330396264662e706e67)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://akameco.github.io"><img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;" alt="akameco"/><br /><sub><b>akameco</b></sub></a><br /><a href="https://github.com/akameco/reducer-tester/commits?author=akameco" title="Code">💻</a> <a href="https://github.com/akameco/reducer-tester/commits?author=akameco" title="Documentation">📖</a> <a href="https://github.com/akameco/reducer-tester/commits?author=akameco" title="Tests">⚠️</a> <a href="#infra-akameco" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td><td align="center"><a href="https://adhrinae.github.io"><img src="https://avatars2.githubusercontent.com/u/14539203?v=4" width="100px;" alt="Ahn Dohyung"/><br /><sub><b>Ahn Dohyung</b></sub></a><br /><a href="https://github.com/akameco/reducer-tester/commits?author=adhrinae" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/kinakobo"><img src="https://avatars3.githubusercontent.com/u/17736005?v=4" width="100px;" alt="kinakobo"/><br /><sub><b>kinakobo</b></sub></a><br /><a href="https://github.com/akameco/reducer-tester/commits?author=kinakobo" title="Documentation">📖</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
