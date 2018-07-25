const Data = require('./data')
const Util = require('./util')

class DB {
  constructor (opts) {
    this.data = null
  }

  async load () {
    if (!this.data) {
      let data = await Data.getAll()

      this.data = {
        records: data,
        users: Util.indexUsers(data),
        schedule: Util.indexSchedule(data)
      }
    }

    return this.data
  }

  async getBadDays (dates, userId) {
    let data = await this.load()
    let results = {}

    for (let date in data.schedule) {
      let day = data.schedule[date]

      if (dates && !dates.includes(date)) continue

      for (let userId in day) {
        let data = day[userId]

        // check bad day
        if (!Util.isBadDay(date, data.user, data.mood, data.stress)) continue

        if (!results[userId]) {
          results[userId] = {
            user: {id: userId, name: data.user[2]},
            days: []
          }
        }

        results[userId].days.push({
          date: new Date(date),
          mood: (data.mood && data.mood[2]) || null,
          stress: (data.stress && data.stress[2]) || null
        })
      }
    }

    return userId ? results[userId] : results
  }
}

module.exports = {
  connect: function (opts) {
    return new DB()
  }
}
