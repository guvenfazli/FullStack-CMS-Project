export default function timeFormatter(time) {
  const fixedDate = new Date(time)
  const formatedDate = fixedDate.toLocaleTimeString([], { timeStyle: 'short' }) // Deletes the seconds.
  return formatedDate
}