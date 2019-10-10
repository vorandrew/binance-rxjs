import { ws } from './binance'
import { Subject } from 'rxjs'
import {
  share,
  map,
  tap,
  filter,
  distinctUntilChanged,
  bufferCount,
} from 'rxjs/operators'

import { debugNameObj } from './helpers'

export default function ohlc(symbol = 'BNBBTC', period = '1m') {
  const Obs = new Subject()

  ws.onKline(symbol, period, data => Obs.next(data))

  return Obs.pipe(
    filter(o => o.s === symbol),
    map(d => ({
      symbol,
      t: +d.k.t,
      o: +d.k.o,
      h: +d.k.h,
      l: +d.k.l,
      c: +d.k.c,
      v: +d.k.v,
    })),
    distinctUntilChanged((n, o) => n.t === o.t),
    bufferCount(2, 1),
    map(([prev]) => prev),
    tap(debugNameObj('ohlc', `${symbol}_${period}`)),
    share(),
  )
}
