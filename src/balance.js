import isEqual from 'lodash/isEqual'
import { share, tap, map, filter, distinctUntilChanged } from 'rxjs/operators'

import ud$ from './userData'

import { debugName } from './helpers'

export default ud$.pipe(
  filter(d => d.e === 'outboundAccountInfo'),
  map(data =>
    data.B.filter(o => +o.f !== 0 || +o.l !== 0).reduce(
      (acc, r) => {
        acc.balance[r.a] = +r.f + +r.l
        if (+r.l) {
          acc.margin[r.a] = +r.l
        }
        return acc
      },
      { balance: {}, margin: {} },
    ),
  ),
  distinctUntilChanged(isEqual),
  tap(debugName('balance')),
  share(),
)
