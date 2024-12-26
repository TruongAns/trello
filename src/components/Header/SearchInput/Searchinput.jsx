import TextField from '@mui/material/TextField'

export default function SearchInput() {
  return (
    <TextField
      id='outlined-basic'
      label='Search'
      variant='outlined'
      size='small'
      sx={{
        width: {
          sm: '100%',
          lg: 200,
          xl: 300,
        },
        display: {
          xs: 'none',
          sm: 'flex',
        },
        flexGrow: {
          md: 1,
          lg: 0,
        },
        '& .MuiInputBase-input': {
          color: 'white',
        },

        '& .MuiInputLabel-root': {
          color: 'white',
        },
        // '& .MuiOutlinedInput-notchedOutline': {
        //   border: '1px solid white',
        // },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: '1px solid white',
          },
          '&:hover fieldset': {
            border: '2px solid white !important',
          },
          '&.Mui-focused  fieldset': {
            borderColor: 'white',
            color: 'white',
          },
        },
      }}
    />
  )
}
