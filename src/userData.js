import { ws, rest } from './binance'
import { Subject } from 'rxjs'
import { share } from 'rxjs/operators'

const Obs = new Subject()

ws.onUserData(rest, data => Obs.next(data))

export default Obs.pipe(share())
