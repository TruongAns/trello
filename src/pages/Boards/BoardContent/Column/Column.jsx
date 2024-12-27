import { Box, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CardItem from './CardItem/CardItem'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { mapOrder } from '@/apis/sort'
import './column.scss'
import {
  HEADER_HEIGHT,
  BOARD_BAR_HEIGHT,
  BOARD_CONTENT_PADDING,
} from '@/pages/Boards/constain.styles'

const COLUMN_PADDING = '8px'
const COLUMN_HEADER_HEIGHT = '38px'
const COLUMN_FOOTER_HEIGHT = '38px'

const Column = props => {
  const { column } = props
  const cards = column?.cards
  const cardOrderIds = column?.cardOrderIds
  const cardSorted = mapOrder(cards, cardOrderIds, '_id')

  return (
    <Box
      sx={{
        maxWidth: 270,
        minWidth: 270,
        background: '#F1F2F4',
        display: 'flex',
        flexDirection: 'column',
        padding: COLUMN_PADDING,
        paddingX: 0,
        borderRadius: 1.5,
        height: 'auto-fit',
        marginRight: 1.5,
        color: '#172b4d',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px  0px 16px 0px',
          height: COLUMN_HEADER_HEIGHT,
          fontWeight: 500,
          fontSize: 14,
          paddingX: 1.5,
        }}
      >
        <span>{column.title}</span>
        <KeyboardArrowDownIcon />
      </Box>
      {/* Card Items */}
      <Box
        className='custom-scroll'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          maxHeight: `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT} - 2*${BOARD_CONTENT_PADDING} - 2*${COLUMN_PADDING} - ${COLUMN_FOOTER_HEIGHT} -  ${COLUMN_HEADER_HEIGHT}  ) `,
          overflowX: 'hidden',
          overflowY: 'auto',
          paddingX: 1,
          marginX: 0.5,
        }}
      >
        {[...cardSorted].map(card => (
          <CardItem card={card} key={card._id} />
        ))}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 1,
          //   padding: '8px  8px 16px 8px',
          height: COLUMN_FOOTER_HEIGHT,
          fontWeight: 600,
          paddingX: 1.5,
        }}
      >
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <DragHandleIcon sx={{ cursor: 'pointer' }} />
      </Box>
    </Box>
  )
}

export default Column
