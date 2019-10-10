import 'dotenv/config'

// import { take, toArray } from 'rxjs/operators'
// import { debug } from './helpers'

jest.setTimeout(60 * 2)

describe('ohlc', () => {
  // describe('live', () => {
  //   it('m1$', async done => {
  //     const s = ohlc().subscribe(ohlc => {
  //       expect(ohlc).toHaveProperty('t')
  //       expect(ohlc).toHaveProperty('o')
  //       expect(ohlc).toHaveProperty('h')
  //       expect(ohlc).toHaveProperty('l')
  //       expect(ohlc).toHaveProperty('c')
  //       expect(ohlc).toHaveProperty('v')
  //       s.unsubscribe()
  //       done()
  //     })
  //   })
  // })

  it('m1$dev', done => {
    const s = ohlc().subscribe()

    // setTimeout(() => {
    //   s.unsubscribe()
    //   done(0)
    // }, 2000)
  })
})
