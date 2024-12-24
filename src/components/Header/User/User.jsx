import { Badge, Box, Tooltip } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import AccountMenu from '../AccountMenu/AccountMenu'
const User = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Tooltip title='Notification'>
        <Badge color='secondary' variant='dot'>
          <NotificationsNoneIcon />
        </Badge>
      </Tooltip>

      <Tooltip title='Help'>
        <HelpCenterIcon />
      </Tooltip>

      <AccountMenu />
    </Box>
  )
}
export default User
