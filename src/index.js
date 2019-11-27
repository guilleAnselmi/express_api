import mongoose from 'mongoose'
import Debug from 'debug'
import settings from './config/settings'
import { app } from './app'
const debug = new Debug('api/index.js')

async function start () {
  try {
    if (process.env.MONGODB_URI) {
      debug('mongodb')
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    } else {
      debug('no mongodb up')
      await mongoose.connect(`mongodb://${settings.database.host}/${settings.database.name}`, { useNewUrlParser: true })
    }
  } catch (e) {
    debug(e)
  } finally {
    app.listen(settings.port, () => {
      debug(`servidor corriendo en puerto ${settings.port}`)
    })
  }
}

start()
