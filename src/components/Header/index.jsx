import { Box, Button, useTheme } from '@mui/material'
import { HEADER_HEIGHT } from '@/pages/Boards/constain.styles'
import ModeSelect from 'components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloLogo from './TrelloLogo/TrelloLogo'
import Workspaces from './Workspaces/Workspaces'
import Recent from './Recent/Recent'
import Started from './Started/Started'
import Template from './Template/Template'
import SearchInput from './SearchInput/Searchinput'
import User from './User/User'
import AddIcon from '@mui/icons-material/Add'
import { HEADER_BG_DARK, HEADER_BG_LIGHT } from '@/pages/Boards/constain.styles'

const Header = () => {
  const theme = useTheme()
  const mode = theme.palette.mode

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: `${HEADER_HEIGHT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: mode == 'light' ? HEADER_BG_LIGHT : HEADER_BG_DARK,
        color: 'white',
        gap: 2,
        '& .MuiButtonBase-root': {
          color: 'white',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AppsIcon sx={{ cursor: 'pointer' }} />
        <TrelloLogo />
        <Box
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Workspaces />
          <Recent />
          <Started />
          <Template />
        </Box>

        <Button
          sx={{
            height: 40,
            display: { xs: 'none', md: 'flex' },
          }}
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexGrow: {
            xs: 0,
            sm: 1,
            lg: 0,
          },
        }}
      >
        <SearchInput />
        <ModeSelect />
        <User />
      </Box>
    </Box>
  )
}

export default Header
