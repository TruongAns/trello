import { Box, Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import TrelloIcon from 'assets/imgs/trello.svg?react'

const TrelloLogo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        cursor: 'pointer',
      }}
    >
      <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' />
      <Typography variant='button' sx={{ display: 'block' }} fontWeight={600}>
        Trello
      </Typography>
    </Box>
  )
}

export default TrelloLogo
