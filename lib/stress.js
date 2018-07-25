const parser = require('./parser')

module.exports = function getStress (callback) {
  parser('../files/stress.csv', (err, data) => {
    return callback(err, createIndex(data.slice(1)))
  })
}

function createIndex (records) {
  return records.reduce((memo, record) => {
    let userId = parseInt(record[0])
    if (!memo[userId]) memo[userId] = []
    memo[userId].push(record)
    return memo
  }, {})
}
