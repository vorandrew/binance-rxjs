import { concat, from } from 'rxjs'
import { share, tap, map, filter, scan } from 'rxjs/operators'

import { rest } from './binance'
import ud$ from './userData'

import { debugName } from './helpers'

export default concat(
  from(rest.openOrders()).pipe(
    map(orders =>
      orders.map(o => ({
        orderId: o.orderId,
        clientOrderId: o.clientOrderId,
        status: o.status,
        timeInForce: o.timeInForce,
        price: +o.price,
        qua: o.type === 'SELL' ? -o.origQty : +o.origQty,
        done: +o.executedQty,
        time: o.time || o.updateTime,
      })),
    ),
  ),
  ud$.pipe(
    filter(d => d.e === 'executionReport'),
    map(o => ({
      orderId: o.i,
      clientOrderId: o.c,
      status: o.X,
      timeInForce: o.f,
      price: +o.p,
      qua: o.S === 'SELL' ? -o.q : +o.q,
      done: +o.z,
      time: o.T,
    })),
  ),
).pipe(
  scan((orders, o) => [...orders.filter(f => f.orderId !== o.orderId), o]),
  // map(orders => orders.filter(o => o)), // remove expired
  tap(debugName('orders')),
  share(),
)
