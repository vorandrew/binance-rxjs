import 'dotenv/config'
import orders$ from './orders'

orders$.subscribe(r => {
  console.log(new Date(), r)
})
