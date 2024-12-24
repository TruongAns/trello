import { Box } from '@mui/material'
import { HEADER_HEIGHT, BOARD_BAR_HEIGHT } from '../constain.size'
const BoardContent = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT})`,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.light',
        }}
      >
        BoardContent
      </Box>
    </>
  )
}

export default BoardContent
