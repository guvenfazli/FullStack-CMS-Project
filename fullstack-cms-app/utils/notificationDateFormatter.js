export default function notificationDateFormatter(date) { // Fixing the date.
  const fixedDate = new Date(date)
  const formatedDate = fixedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })
  const replacedDate = formatedDate.replaceAll('.', '/')
  return replacedDate
}