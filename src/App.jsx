/* eslint-disable no-unused-vars */

import Button from '@mui/material/Button'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  SvgIcon,
  useColorScheme,
} from '@mui/material'
import { pink } from '@mui/material/colors'

const BasicRadioChoiceTheme = () => {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }

  return (
    <FormControl>
      <FormLabel id='demo-theme-toggle'>Theme</FormLabel>
      <RadioGroup
        aria-labelledby='demo-theme-toggle'
        name='theme-toggle'
        row
        value={mode}
        onChange={event => setMode(event.target.value)}
      >
        <FormControlLabel value='system' control={<Radio />} label='System' />
        <FormControlLabel value='light' control={<Radio />} label='Light' />
        <FormControlLabel value='dark' control={<Radio />} label='Dark' />
      </RadioGroup>
    </FormControl>
  )
}

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
function BasicSelect() {
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
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel id='simple-theme'>Theme</InputLabel>
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

function App() {
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
      </SvgIcon>
    )
  }

  return (
    <>
      <br />
      <BasicRadioChoiceTheme />
      <br />
      <BasicSelect />
      <br />
      <div>DTA</div>
      <Button variant='text'>Text</Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
      <Stack direction='row' spacing={3}>
        <HomeIcon />
        <HomeIcon color='primary' />
        <HomeIcon color='secondary' />
        <HomeIcon color='success' />
        <HomeIcon color='action' />
        <HomeIcon color='disabled' />
        <HomeIcon sx={{ color: pink[500] }} />
      </Stack>
    </>
  )
}

export default App
