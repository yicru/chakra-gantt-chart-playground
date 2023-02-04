import { Box, Text } from '@chakra-ui/react'
import { GanttChart } from '@/components/GanttChart'

export default function Home() {
  return (
    <Box p={10} bg={'gray.50'}>
      <Text fontSize={'2xl'} fontWeight={'black'} mb={4}>
        Chakra Gantt Chart
      </Text>
      <GanttChart />
    </Box>
  )
}
