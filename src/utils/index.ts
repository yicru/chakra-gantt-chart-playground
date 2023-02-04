import { addDays, addMonths } from 'date-fns'

export const generateRandomDateRanges = (
  count: number,
  option = {
    min: new Date(),
    max: addMonths(new Date(), 6),
  }
): { from: Date; to: Date }[] => {
  return Array.from({ length: count }, () => {
    const from = new Date(
      option.min.getTime() +
        Math.random() * (option.max.getTime() - option.min.getTime())
    )
    const to = addDays(from, Math.floor(Math.random() * 30))

    return { from, to }
  })
}
