const parser = require('./parser')

module.exports = function getUsers (callback) {
  parser('../files/users.csv', (err, data) => {
    return callback(err, createIndex(data.slice(1)))
  })
}

function createIndex (users) {
  return users.reduce((memo, record) => {
    // index by user id
    memo[parseInt(record[0])] = record
    return memo
  }, {})
}
