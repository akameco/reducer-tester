import { AnyAction } from 'redux'
import reducerTester from '.'

const noop = (): void => {}
const reducer = (state: object = {}, action: AnyAction): object => {
  if (action.payload) {
    return { result: action.payload }
  }
  return state
}

let itSpy: jest.SpyInstance

const state = {}

beforeEach(() => {
  // @ts-ignore
  itSpy = jest.spyOn(global, 'it').mockImplementation(noop)
})

afterEach(() => {
  itSpy.mockRestore()
})

test('throws an invariant if tests is not Array', () => {
  expect(() => {
    // @ts-ignore
    reducerTester({ reducer, state, tests: null })
  }).toThrowErrorMatchingSnapshot()
})

test('throws an invariant if type property is not exist', () => {
  expect(() => {
    // @ts-ignore
    reducerTester({ reducer, state, tests: [{ typo: 'typo' }] })
  }).toThrowErrorMatchingSnapshot()
})

test('throws an invariant if state property is not exist', () => {
  expect(() => {
    // @ts-ignore
    reducerTester({ reducer, tests: [] })
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
