import snapshotDiff from 'snapshot-diff'

function reducerTester({ tests, reducer, state }) {
  if (tests.length === 0) {
    return
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
