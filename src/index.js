// @flow
import snapshotDiff from 'snapshot-diff'
import invariant from 'invariant'

function reducerTester({
  tests,
  reducer,
  state,
  initialTest = true,
  titlePrefix = '',
}: {
  tests: Array<{ type: $Subtype<string>, [key: any]: any }>,
  reducer: Function,
  state: Object,
  initialTest?: boolean,
  titlePrefix?: string,
}) {
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

    it(titlePrefix + t.type, () => {
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

export default reducerTester
