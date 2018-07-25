const DB = require('../lib/db').connect()
const Util = require('util')

async function getStreak (count, callback) {
  let data = await DB.getBadDays()
  let values = []

  for (let userId in data) {
    let user = data[userId].user
    let days = data[userId].days
    let streak = findStreak(days)

    values.push({
      name: user.name,
      days: streak,
      start: streak.length && streak[0].date
    })
  }

  let streaks = values.sort((a, b) => {
    return b.days.length - a.days.length
  })

  return callback(null, streaks.slice(0, count))
}

function findStreak (days) {
  let items = days.sort((a, b) => {
    return a.date.getTime() - b.date.getTime()
  })

  let streak = []

  for (let i = 0; i < items.length; i++) {
    let last = items[i - 1]

    if (!last) continue

    if (!isNextDay(last.date, items[i].date)) {
      streak.length = 0
      continue
    }

    streak.push(items[i])
  }

  return streak
}

function isNextDay (d1, d2) {
  let days = ((d2.getTime() - d1.getTime()) / 86400000)
  return days > 0 && days < 2
}

module.exports.run = Util.promisify(getStreak)
