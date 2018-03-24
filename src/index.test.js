// @flow
import reducerTester from '.'

const noop = () => {}
const reducer = (state, action) => ({ result: action.payload })

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
  expect(itSpy).toHaveBeenCalledTimes(1)
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

// haha... jest work :)
reducerTester({
  tests: [{ type: 'work', payload: 'payload' }],
  reducer,
  state: {},
})
