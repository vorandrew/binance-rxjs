import { ws } from './binance'
import { Subject } from 'rxjs'
import { share, map, tap, filter, distinctUntilChanged } from 'rxjs/operators'

import { debugNameObj } from './helpers'

export default function quote(symbol = 'BNBBTC') {
  const Obs = new Subject()

  ws.onTicker(symbol, data => Obs.next(data))

  return Obs.pipe(
    filter(o => o.s === symbol),
    map(o => ({ symbol, bid: +o.b, ask: +o.a })),
    distinctUntilChanged((o, n) => o.bid !== n.bid || o.ask !== n.ask),
    tap(debugNameObj('quote', symbol)),
    share(),
  )
}
