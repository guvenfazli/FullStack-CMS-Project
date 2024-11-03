export default function dateFormatter(date) { // Fixing the date.
  const fixedDate = new Date(date)
  const formatedDate = fixedDate.toLocaleDateString()
  const replacedDate = formatedDate.replaceAll('.', '/')
  return replacedDate
}