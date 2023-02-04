import { Box, Grid, GridProps, Text, Tooltip } from '@chakra-ui/react'
import { useGanttChart } from '@/hooks/useGanttChart'
import { format } from 'date-fns'
import locale from 'date-fns/locale/ja'

type Props = {
  label: string
  from: Date
  to: Date
} & GridProps

export const GanttChartRow = ({ label, from, to, ...gridProps }: Props) => {
  const { options, days, findIndexByDate } = useGanttChart()

  const fromIndex = findIndexByDate(from)
  const toIndex = findIndexByDate(to)

  const dateLabel = [
    format(from, 'yyyy/MM/dd（E）', { locale }),
    '〜',
    format(to, 'yyyy/MM/dd（E）', { locale }),
  ].join(' ')

  return (
    <Grid
      borderTopWidth={'1px'}
      gridTemplateColumns={`${options.labelWidth} 1fr`}
      alignItems={'center'}
      {...gridProps}
    >
      <Box px={4}>
        <Text fontWeight={'semibold'}>{label}</Text>
      </Box>

      <Grid
        py={2}
        gridTemplateColumns={`repeat(${days.length}, ${options.blockWidth})`}
        gridGap={'8px 0'}
      >
        <Tooltip label={dateLabel}>
          <Box
            cursor={'pointer'}
            py={2}
            px={3}
            rounded={'sm'}
            gridColumn={`${fromIndex + 1} / ${toIndex + 1}`}
            bgColor={'blue.900'}
            zIndex={2}
          >
            <Text fontSize={'sm'} color={'white'} noOfLines={1}>
              {dateLabel}
            </Text>
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  )
}
