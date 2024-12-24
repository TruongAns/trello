import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'

const theme = createTheme({
  //   cssVariables: true,
  colorSchemes: {
    light: true,
    dark: true,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: green[500],
    },
  },
})

export default theme
