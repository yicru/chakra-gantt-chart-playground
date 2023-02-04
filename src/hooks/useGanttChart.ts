import { atom, useRecoilState } from 'recoil'
import {
  addMonths,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns'

const optionsAtom = atom({
  key: 'ganttChartOptions',
  default: {
    from: new Date(),
    to: addMonths(new Date(), 6),
    labelWidth: '150px',
    blockWidth: '30px',
  },
})

export const useGanttChart = () => {
  const [options, setOptions] = useRecoilState(optionsAtom)

  const days = eachDayOfInterval({
    start: options.from,
    end: options.to,
  })

  const findIndexByDate = (target: Date) => {
    if (isBefore(target, options.from)) return 0
    if (isAfter(target, options.to)) return days.length - 1
    return days.findIndex((day) => isSameDay(day, target))
  }

  return {
    days,
    options,
    setOptions,
    findIndexByDate,
  }
}
