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

beforeEach(() => {
  itSpy = jest.spyOn(global, 'it').mockImplementation(noop)
})

afterEach(() => {
  itSpy.mockRestore()
})

test('can provide an object for tests', () => {
  const title = 'reducer-test'
  reducerTester({
    tests: [{ type: title, payload: 'payload' }],
    reducer,
    state: {},
  })
  expect(itSpy).toHaveBeenCalledTimes(2)
  expect(itSpy).toBeCalledWith(title, expect.any(Function))
})

test('can provide empty array for tests', () => {
  reducerTester({
    tests: [],
    reducer,
    state: {},
  })
  expect(itSpy).not.toBeCalled()
})

test('not handle initial state with initialTest =  false', () => {
  reducerTester({
    tests: [{ type: 'test' }],
    reducer,
    state: {},
    initialTest: false,
  })

  expect(itSpy).toHaveBeenCalledTimes(1)
})

// haha... jest work :)
reducerTester({
  tests: [{ type: 'work', payload: 'payload' }],
  reducer,
  state: {},
})
