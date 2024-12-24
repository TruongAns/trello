import { Box, Button } from '@mui/material'
import { HEADER_HEIGHT } from '@/pages/Boards/constain.size'
import ModeSelect from 'components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloLogo from './TrelloLogo/TrelloLogo'
import Workspaces from './Workspaces/Workspaces'
import Recent from './Recent/Recent'
import Started from './Started/Started'
import Template from './Template/Template'
import SearchInput from './SearchInput/Searchinput'
import User from './User/User'

const Header = () => {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: `${HEADER_HEIGHT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'primary.light',
        color: 'primary.main',
        gap: 2,
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
          variant='outlined'
          sx={{ height: 40, display: { xs: 'none', md: 'block' } }}
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
