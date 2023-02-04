import { Box, Grid } from '@chakra-ui/react'
import { GanttChartRow } from '@/components/GanttChartRow'
import { useGanttChart } from '@/hooks/useGanttChart'
import { GanttChartHeader } from '@/components/GanttChartHeader'
import { generateRandomDateRanges } from '@/utils'

export const GanttChart = () => {
  const { options, days } = useGanttChart()

  const resources = generateRandomDateRanges(1000)
    .sort((a, b) => a.from.getTime() - b.from.getTime())
    .map((range, index) => ({
      from: range.from,
      to: range.to,
      label: `リソース ${index}`,
    }))

  return (
    <Grid
      bg={'white'}
      position={'relative'}
      shadow={'2xl'}
      rounded={'lg'}
      overflowX={'scroll'}
    >
      <GanttChartHeader />

      <Box position={'relative'}>
        <Grid
          gridTemplateColumns={`${options.labelWidth} repeat(${days.length}, ${options.blockWidth})`}
          position={'absolute'}
          inset={0}
        >
          <Box borderRightWidth={'1px'} />
          {days.map((day) => (
            <Box borderRightWidth={'1px'} key={day.toString()} />
          ))}
        </Grid>
        {resources.map((resource, index) => (
          <GanttChartRow
            key={index}
            from={resource.from}
            to={resource.to}
            label={resource.label}
          />
        ))}
      </Box>
    </Grid>
  )
}
