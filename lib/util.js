module.exports.getMoodsWeekOf = function (records, weekOf) {
  return weekOf.reduce((memo, date) => {
    memo[date] = records[date]
    return memo
  }, {})
}

module.exports.getStressWeekOf = function (records, weekOf) {
  return weekOf.reduce((memo, date) => {
    memo[date] = records[date]
    return memo
  }, {})
}

module.exports.indexByDate = function indexByDate (records) {
  return records.reduce((memo, record) => {
    let date = record[1]
    if (!memo[date]) memo[date] = record
    return memo
  }, {})
}

module.exports.indexUsers = function (data) {
  let index = {}

  for (let userId in data.users) {
    let user = data.users[userId]
    let moods = data.moods[userId]
    let stresses = data.stress[userId]

    index[userId] = Object.assign({
      moods: module.exports.indexByDate(moods),
      stresses: module.exports.indexByDate(stresses)
    }, user)
  }

  return index
}

module.exports.indexSchedule = function (data) {
  let index = {}

  for (let userId in data.moods) {
    let user = data.users[userId]
    let items = data.moods[userId]

    items.forEach((item) => {
      let date = item[1]
      if (!index[date]) index[date] = {}

      if (!index[date][userId]) index[date][userId] = {}

      index[date][userId].user = user
      index[date][userId].mood = item
    })
  }

  for (let userId in data.stress) {
    let user = data.users[userId]
    let items = data.stress[userId]

    items.forEach((item) => {
      let date = item[1]
      if (!index[date]) index[date] = {}

      if (!index[date][userId]) index[date][userId] = {}

      index[date][userId].user = user
      index[date][userId].stress = item
    })
  }

  return index
}

module.exports.isBadDay = function (date, user, mood, stress) {
  let m = mood && parseInt(mood[2])
  let s = stress && parseInt(stress[2])

  if (m && [1, 2].includes(m)) return true
  if (m === 3 && [4, 5].includes(s)) return true

  return false
}
