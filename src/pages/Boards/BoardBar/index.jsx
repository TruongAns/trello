import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { BOARD_BAR_HEIGHT } from '../constain.styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PublicIcon from '@mui/icons-material/Public'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import MenuIcon from '@mui/icons-material/Menu'
import {
  BOARD_BAR_BG_DARK,
  BOARD_BAR_BG_LIGHT,
} from '@/pages/Boards/constain.styles'

const StyleChip = {
  color: 'white',
  bgcolor: 'transparent',
  paddingX: 1,
  paddingY: 2.5,
  borderRadius: 2,
  border: 'none',
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
  '&.MuiChip-clickable:hover': {
    // backgroundColor: 'primary.50',
  },
  fontSize: 13,
  fontWeight: 500,
  '@media (max-width: 1200px)': {
    '.MuiChip-label': {
      display: 'none', // Ẩn label khi màn hình nhỏ hơn md
    },
    '.MuiChip-icon': {
      margin: 0, // Loại bỏ margin mặc định của icon
    },
  },
}
const BoardBar = () => {
  const theme = useTheme()
  const mode = theme.palette.mode
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')) // Kiểm tra nếu màn hình nhỏ hơn 'sm'
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: `${BOARD_BAR_HEIGHT}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor:
            mode == 'light' ? BOARD_BAR_BG_LIGHT : BOARD_BAR_BG_DARK,

          gap: 2,
          paddingX: 2,
        }}
      >
        {/* Left */}
        {!isSmallScreen ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {/* DTA MERN Stack Board*/}

            <Chip
              sx={StyleChip}
              label='DTA MERN Stack Board'
              icon={
                <Tooltip title='MERN Stack'>
                  <DashboardIcon />
                </Tooltip>
              }
              variant='outlined'
              onClick={() => {}}
            />

            {/* Public/Private Workspace */}
            <Chip
              sx={StyleChip}
              label='Public/Private Workspace'
              icon={
                <Tooltip title='Public/Private Workspace'>
                  <PublicIcon />
                </Tooltip>
              }
              variant='outlined'
              onClick={() => {}}
            />

            {/* Add To Google Drive */}
            <Chip
              sx={StyleChip}
              label='Add To Google Drive'
              icon={
                <Tooltip title='Add To Google Drive'>
                  <AddToDriveIcon />
                </Tooltip>
              }
              variant='outlined'
              onClick={() => {}}
            />

            {/* Automation */}
            <Chip
              sx={StyleChip}
              label='Automation'
              icon={
                <Tooltip title='Automation'>
                  <BoltIcon />
                </Tooltip>
              }
              variant='outlined'
              onClick={() => {}}
            />

            {/* Filters */}
            <Chip
              sx={StyleChip}
              label='Filters'
              icon={
                <Tooltip title='Filters'>
                  <FilterListIcon />
                </Tooltip>
              }
              variant='outlined'
              onClick={() => {}}
            />
          </Box>
        ) : (
          <MenuIcon />
        )}

        {/* Right */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant='outlined'
            sx={{
              height: 40,
              lineHeight: 'unset',
              color: 'white',
              border: '1px solid white',
            }}
            startIcon={<PersonAddAlt1Icon />}
          >
            Invite
          </Button>
          <AvatarGroup
            total={24}
            max={isSmallScreen ? 3 : 5}
            spacing='medium'
            sx={{
              '& .MuiAvatarGroup-avatar': {
                width: 35,
                height: 35,
                fontSize: 16,
                cursor: 'pointer',
              },
            }}
          >
            <Avatar
              alt='Remy Sharp'
              src='https://mighty.tools/mockmind-api/content/human/43.jpg'
            />
            <Avatar
              alt='Travis Howard'
              src='https://mighty.tools/mockmind-api/content/human/49.jpg'
            />
            <Avatar
              alt='Agnes Walker'
              src='https://mighty.tools/mockmind-api/content/human/120.jpg'
            />
            <Avatar
              alt='Trevor Henderson'
              src='https://mighty.tools/mockmind-api/content/human/119.jpg'
            />
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar
