import { createTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

const theme = createTheme({
  //   cssVariables: true,

  colorSchemes: {
    light: {
      palette: {
        // primary: teal,
        // secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        // primary: cyan,
        // secondary: orange,
      },
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '0.875rem',
          textTransform: 'none',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          fontSize: '0.875rem',
        }),
      },
    },
  },
})

export default theme
