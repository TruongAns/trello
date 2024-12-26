import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from '@mui/material'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  const handleChange = event => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }
  //   system
  // light
  // dark

  return (
    <FormControl
      style={{ minWidth: 140 }}
      size='small'
      sx={{
        display: {
          xs: 'none',
          md: 'block',
          color: 'white',
          '& .MuiInputLabel-root': {
            color: 'white !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid white',
            borderColor: 'white !important',
          },
          '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white ',
          },
          '& .MuiInputBase-root': {
            color: 'white ',
          },
          '& .MuiSvgIcon-root': {
            color: 'white ',
          },
        },
      }}
    >
      <InputLabel id='simple-theme'>Themes</InputLabel>
      <Select
        labelId='simple-theme'
        id='theme-select'
        value={mode}
        label='Theme'
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LightModeIcon fontSize='small' />
            Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DarkModeIcon fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsBrightnessIcon fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
