import moment from 'moment-timezone'

export function getCurrentTimestamp() {
  const dateISOString = new Date().toISOString()

  const date = moment.utc(dateISOString)
  const formattedDate = date.format('YYYY-MM-DD HH:mm:ss')

  return formattedDate
}
