// @flow
import reducerTester from '.'

const noop = () => {}
const reducer = (state = {}, action) => {
  if (action.payload) {
    return { result: action.payload }
  }
  return state
}

let itSpy

const state = {}

beforeEach(() => {
  itSpy = jest.spyOn(global, 'it').mockImplementation(noop)
})

afterEach(() => {
  itSpy.mockRestore()
})

test('throws an invariant if tests is not Array', () => {
  expect(() => {
    // $FlowFixMe
    reducerTester({ reducer, state, tests: null })
  }).toThrowErrorMatchingSnapshot()
})

test('throws an invariant if type property is not exist', () => {
  expect(() => {
    // $FlowFixMe
    reducerTester({ reducer, state, tests: [{ typo: 'typo' }] })
  }).toThrowErrorMatchingSnapshot()
})

test('can provide an object for tests', () => {
  const title = 'reducer-test'
  reducerTester({
    reducer,
    state,
    tests: [{ type: title, payload: 'payload' }],
  })
  expect(itSpy).toHaveBeenCalledTimes(2)
  expect(itSpy).toBeCalledWith(title, expect.any(Function))
  expect(itSpy).toBeCalledWith('handle initial state', expect.any(Function))
})

test('can provide empty array for tests', () => {
  reducerTester({ tests: [], reducer, state })
  expect(itSpy).toHaveBeenCalledTimes(1)
})

test('can provide initialTest', () => {
  reducerTester({
    reducer,
    state,
    tests: [{ type: 'test' }],
    initialTest: true,
  })

  expect(itSpy).toHaveBeenCalledTimes(2)
  expect(itSpy).toBeCalledWith('handle initial state', expect.any(Function))
})

test('not handle initial state with initialTest =  false', () => {
  reducerTester({
    reducer,
    state,
    tests: [{ type: 'test' }],
    initialTest: false,
  })

  expect(itSpy).toHaveBeenCalledTimes(1)
})

test('can provide titlePrefix', () => {
  const title = 'reducer'
  reducerTester({
    reducer,
    state,
    titlePrefix: 'handle ',
    tests: [{ type: title, payload: 'payload' }],
  })
  expect(itSpy).toHaveBeenCalledTimes(2)
  expect(itSpy).toBeCalledWith('handle reducer', expect.any(Function))
})

// haha... jest work :)
reducerTester({
  reducer,
  state,
  tests: [{ type: 'work', payload: 'payload' }],
})

reducerTester({
  reducer,
  state,
  titlePrefix: 'handle ',
  tests: [{ type: 'work', payload: 'payload' }],
})
