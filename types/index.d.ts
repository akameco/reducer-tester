// Action, Reducer types reference
// https://github.com/reduxjs/redux/blob/master/index.d.ts
interface Action<T = any> {
  type: T
}

interface AnyAction extends Action {
  [extraProps: string]: any
}

type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S


/**
 * Definition of options for `reducerTester` function
 * 
 * @param TestOption - Available options for testing reducer
 * @property tests - Array of Actions
 * @property reducer - The reducer function going to be tested
 * @property state - Redux State, should be the same type as the argument of reducer function which provided before.
 * @property {optional} initialTest - Tells reducerTester if this test is testing initial state
 * @property {optional} titlePrefix - Set prefix for each action snapshots. otherwise snapshot title will be just action type.
 */
export interface TesterOption<S = any, A extends Action = AnyAction> {
  tests: A[]
  reducer: Reducer<S, A>
  state: S
  initialTest?: boolean
  titlePrefix?: string
}

declare function reducerTester<S = any, A extends Action = AnyAction>(options: TesterOption<S, A>): void

export default reducerTester
