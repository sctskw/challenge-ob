const DB = require('../lib/db').connect()
const Util = require('util')

async function getBadDays (days, callback) {
  let data = await DB.getBadDays(days)
  let values = Object.values(data).sort((a, b) => {
    return b.days.length - a.days.length
  })

  return callback(null, values)
}

module.exports.run = Util.promisify(getBadDays)
