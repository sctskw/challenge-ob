const BadWeek = require('./reports/badWeek')
const Streaks = require('./reports/streaks')

BadWeek.run([
  '2017-05-07',
  '2017-05-08',
  '2017-05-09',
  '2017-05-10',
  '2017-05-11',
  '2017-05-12',
  '2017-05-13'
]).then((data) => {
  data.forEach((value) => {
    if (value.days.length > 1) {
      console.log(value.user.name, value.days.length)
    }
  })
})

Streaks.run(5).then((data) => {
  console.log('------------\n')
  console.log('Top Streaks: \n')
  data.forEach((item) => {
    console.log(item.name, item.days.length, item.start.toDateString())
  })
})
