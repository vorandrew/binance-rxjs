import 'dotenv/config'
import { quote } from './index'

describe('quote', () => {
  it('one instrument', done => {
    const bnbbtc$ = quote()
    const s = bnbbtc$.subscribe(quote => {
      expect(quote).toHaveProperty('symbol')
      expect(quote).toHaveProperty('bid')
      expect(quote).toHaveProperty('ask')
      s.unsubscribe()
      done()
    })
  })
})
