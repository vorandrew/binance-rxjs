import Binance from 'binance'

export const rest = new Binance.BinanceRest({
  key: process.env.BINANCE_KEY,
  secret: process.env.BINANCE_SECRET,
  timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
  recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
  disableBeautification: false,
  handleDrift: false,
})

export const ws = new Binance.BinanceWS(false)
