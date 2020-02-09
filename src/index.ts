/* eslint @typescript-eslint/no-explicit-any: 0 */
import snapshotDiff from 'snapshot-diff'
import invariant from 'invariant'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Action as ReduxAction, AnyAction, Reducer } from 'redux'

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer())

/**
 * Definition of options for `reducerTester` function
 *
 * @param TesterOption - Available options for testing reducer.
 * @property tests - Array of Actions.
 * @property reducer - The reducer function going to be tested.
 * @property state - Redux State, should be the same type as the argument of reducer function which provided before.
 * @property {optional} initialTest - Tells reducerTester if this test is testing initial state.
 * @property {optional} titlePrefix - Set prefix for each action snapshots. otherwise snapshot title will be just action type.
 */
type TesterOption<State = any, Action extends ReduxAction = AnyAction> = {
  tests: Action[]
  reducer: Reducer<State, Action>
  state: State
  initialTest?: boolean
  titlePrefix?: string
}

export default function reducerTester({
  tests,
  reducer,
  state,
  initialTest = true,
  titlePrefix = '',
}: TesterOption): void {
  if (initialTest) {
    it('handle initial state', () => {
      expect(
        snapshotDiff(state, reducer(undefined, { type: '@@INIT' }))
      ).toMatchSnapshot()
    })
  }

  invariant(state, 'required `state` property.')
  invariant(tests, 'required `tests` property.')
  invariant(Array.isArray(tests), 'tests must be a Array.')

  for (const t of tests) {
    invariant(t.type, `${JSON.stringify(t)} Action required \`type\` property.`)

    it(`${titlePrefix}${t.type}`, () => {
      expect(
        snapshotDiff(state, reducer(state, t), {
          expand: true,
          aAnnotation: 'Before',
          bAnnotation: 'After',
        })
      ).toMatchSnapshot()
    })
  }
}
