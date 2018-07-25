const util = require('util')
const getUsers = require('./users')
const getStress = require('./stress')
const getMoods = require('./moods')

async function getAll () {
  let users = await util.promisify(getUsers)()
  let stress = await util.promisify(getStress)()
  let moods = await util.promisify(getMoods)()

  return {
    users: users,
    stress: stress,
    moods: moods
  }
}

module.exports = { getAll }
