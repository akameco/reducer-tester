import reducerTester from '.'

/**
 * Just compile time test (Can see errors any editors with typescript support)
 * not actually working (needs typescript + jest setup, which is unnecessary)
 */

const noop = () => {}
const reducer = (state = {}, action) => {
  if (action.payload) {
    return {
      result: action.payload,
    }
  }

  return state
}

let itSpy

const state = {}

beforeEach(() => {
  itSpy = jest.spyOn(global, 'it' as any).mockImplementation(noop)
})

afterEach(() => {
  itSpy.mockRestore()
})

test('throws an invariant if tests is not Array', () => {
  expect(() => {
    reducerTester({
      reducer,
      state,
      tests: null,
    })
  }).toThrowErrorMatchingSnapshot()
})

test('throws an invariant if type property is not exist', () => {
  expect(() => {
    reducerTester<{}, { type: 'typo' }>({
      reducer,
      state,
      tests: [{ typo: 'typo' }], // Compile Error
    })
  }).toThrowErrorMatchingSnapshot()
})

test('throws an invariant if state property is not exist', () => {
  expect(() => {
    reducerTester({ reducer, tests: [] }) // Compile Error
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
  expect(itSpy).toHaveBeenCalledWith(title, expect.any(Function))
  expect(itSpy).toHaveBeenCalledWith(
    'handle initial state',
    expect.any(Function)
  )
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
  expect(itSpy).toHaveBeenCalledWith(
    'handle initial state',
    expect.any(Function)
  )
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
  expect(itSpy).toHaveBeenCalledWith('handle reducer', expect.any(Function))
})

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
