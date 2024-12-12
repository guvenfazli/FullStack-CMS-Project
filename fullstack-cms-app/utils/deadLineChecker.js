export default function deadLineChecker(date) { // Calculating remaining time.
  const todaysDate = new Date()
  const today = todaysDate.getTime()
  const fixedDate = new Date(date)
  const fixedTime = fixedDate.getTime()
  const remainingDay = fixedTime - today
  const formatRemainingDay = Math.round(remainingDay / (1000 * 3600 * 24))

  if (formatRemainingDay <= 3 && formatRemainingDay > 0) {
    return formatRemainingDay + " days left for the project!"
  } else if (formatRemainingDay === 0) {
    return "This is the last day!"
  } else if (formatRemainingDay < 0) {
    return "Deadline passed!"
  } else {
    const formatedDate = fixedDate.toLocaleDateString()
    const replacedDate = formatedDate.replaceAll('.', '/')
    return replacedDate
  }
}