import Debug from 'debug'

export const debug = Debug('binance-rxjs:global')

export const debugName = name => {
  const debug = new Debug(`binance-rxjs:${name}`)
  return val => debug(new Date(), val)
}

export const debugNameObj = (name, obj) => {
  const debug = new Debug(`binance-rxjs:${name}`)
  return val => debug(new Date(), obj, val)
}
