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
      }}
    />
  )
}
