const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')

module.exports = function (filename, callback) {
  let parser = parse({delimiter: ','})
  let file = path.resolve(__dirname, filename)
  let data = fs.readFileSync(file, 'utf-8')

  let records = []
  let next

  parser.on('readable', function () {
    next = parser.read()
    while (next) {
      records.push(next)
      next = parser.read()
    }
  })

  parser.on('finish', function () {
    return callback(null, records)
  })

  parser.on('error', callback)

  parser.write(data)

  parser.end()
}
