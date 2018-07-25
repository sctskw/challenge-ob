const util = require('util')
const Users = require('./users')
const Stress = require('./stress')
const Moods = require('./moods')

async function getAll () {
  let users = await util.promisify(Users)()
  let stress = await util.promisify(Stress)()
  let moods = await util.promisify(Moods)()

  return {
    users: createUserIndex(users.slice(1)),
    stress: createStressIndex(stress.slice(1)),
    moods: createMoodIndex(moods.slice(1))
  }
}

function createUserIndex (users) {
  return users.reduce((memo, record) => {
    // index by user id
    memo[parseInt(record[0])] = record
    return memo
  }, {})
}

function createStressIndex (records) {
  return records.reduce((memo, record) => {
    let userId = parseInt(record[0])
    if (!memo[userId]) memo[userId] = []
    memo[userId].push(record)
    return memo
  }, {})
}

function createMoodIndex (records) {
  return records.reduce((memo, record) => {
    let userId = parseInt(record[0])
    if (!memo[userId]) memo[userId] = []
    memo[userId].push(record)
    return memo
  }, {})
}

module.exports = { getAll }
