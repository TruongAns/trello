import { Box, useTheme } from '@mui/material'
import { HEADER_HEIGHT, BOARD_BAR_HEIGHT } from '../constain.styles'
import {
  BOARD_CONTENT_BG_DARK,
  BOARD_CONTENT_BG_LIGHT,
} from '@/pages/Boards/constain.styles'
const BoardContent = () => {
  const theme = useTheme()
  const mode = theme.palette.mode
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT})`,
          display: 'flex',
          alignItems: 'center',
          backgroundColor:
            mode == 'dark' ? BOARD_CONTENT_BG_DARK : BOARD_CONTENT_BG_LIGHT,
        }}
      >
        BoardContent
      </Box>
    </>
  )
}

export default BoardContent
