import snapshotDiff from 'snapshot-diff'

function reducerTester({ tests, reducer, state, initialTest = true }) {
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
    it(t.type, () => {
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
