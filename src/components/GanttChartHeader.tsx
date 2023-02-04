import { Box, Center, Grid, Text } from '@chakra-ui/react'
import { useGanttChart } from '@/hooks/useGanttChart'
import { useMemo } from 'react'
import * as R from 'remeda'
import { format } from 'date-fns'

export const GanttChartHeader = () => {
  const { options, days } = useGanttChart()

  const groupByYearMonth = useMemo(() => {
    const entries = R.groupBy(days, (day) => format(day, 'yyyy-MM'))

    return Object.entries(entries).map(([key, value]) => ({
      yearMonth: key,
      days: value,
    }))
  }, [days])

  return (
    <Grid
      alignItems={'center'}
      gridTemplateColumns={`${options.labelWidth} 1fr`}
    >
      <Center h={'full'} px={4} fontSize={'sm'} borderRightWidth={'1px'}>
        <Text>{format(new Date(), 'yyyy/MM/dd')}</Text>
      </Center>

      <Box fontSize={'xs'} fontWeight={'bold'}>
        <Grid
          gridTemplateColumns={`repeat(${days.length}, ${options.blockWidth})`}
        >
          {groupByYearMonth.map((group) => (
            <Center
              borderRightWidth={'1px'}
              bg={'white'}
              key={group.yearMonth}
              gridColumn={`auto / span ${group.days.length}`}
              py={2}
            >
              {group.yearMonth}
            </Center>
          ))}
        </Grid>

        <Grid
          borderTopWidth={'1px'}
          gridTemplateColumns={`repeat(${days.length}, ${options.blockWidth})`}
        >
          {days.map((day) => (
            <Center
              py={2}
              bg={'white'}
              key={day.toString()}
              borderRightWidth={'1px'}
            >
              {day.getDate()}
            </Center>
          ))}
        </Grid>
      </Box>
    </Grid>
  )
}
