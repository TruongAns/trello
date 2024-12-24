import { Box } from '@mui/material'
import { BOARD_BAR_HEIGHT } from '../constain.size'
const BoardBar = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: `${BOARD_BAR_HEIGHT}`,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.dark',
        }}
      >
        BoardBar
      </Box>
    </>
  )
}

export default BoardBar
