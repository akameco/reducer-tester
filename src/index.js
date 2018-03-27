// @flow
import snapshotDiff from 'snapshot-diff'

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
  if (tests.length === 0) {
    return
  }

  if (initialTest) {
    it('handle initial state', () => {
      expect(
        snapshotDiff(state, reducer(undefined, { type: '@@INIT' }))
      ).toMatchSnapshot()
    })
  }

  for (const t of tests) {
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
