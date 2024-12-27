import { Box, useTheme } from '@mui/material'
import { HEADER_HEIGHT, BOARD_BAR_HEIGHT } from '../constain.styles'
import {
  BOARD_CONTENT_BG_DARK,
  BOARD_CONTENT_BG_LIGHT,
  BOARD_CONTENT_PADDING,
} from '@/pages/Boards/constain.styles'
import Column from './Column/Column'

import { mockData as boardData } from '@/apis/mockdata'
import { mapOrder } from '@/apis/sort'

const BoardContent = () => {
  const theme = useTheme()
  const mode = theme.palette.mode
  const columns = boardData.board.columns
  const columnOrderIds = boardData.board.columnOrderIds
  const columnSorted = mapOrder(columns, columnOrderIds, '_id')

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT})`,
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor:
            mode == 'dark' ? BOARD_CONTENT_BG_DARK : BOARD_CONTENT_BG_LIGHT,
          padding: BOARD_CONTENT_PADDING,
          overflowY: 'auto',
        }}
      >
        {[...columnSorted].map(column => {
          return <Column column={column} key={column._id} />
        })}
      </Box>
    </>
  )
}

export default BoardContent
