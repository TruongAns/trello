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

import { useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext } from '@dnd-kit/sortable'

const COLUMN_PADDING = '8px'
const COLUMN_HEADER_HEIGHT = '38px'
const COLUMN_FOOTER_HEIGHT = '38px'

const Column = props => {
  const { column } = props
  const cards = column?.cards
  const cardOrderIds = column?.cardOrderIds
  const cardSorted = mapOrder(cards, cardOrderIds, '_id')

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? '0.5' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
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
          ref={setActivatorNodeRef}
          {...listeners}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px  0px 16px 0px',
            height: COLUMN_HEADER_HEIGHT,
            fontWeight: 500,
            fontSize: 14,
            paddingX: 1.5,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <span>{column.title}</span>
          <KeyboardArrowDownIcon />
        </Box>
        {/* Card Items */}
        <SortableContext
          items={cardSorted.map(card => card._id)}
          strategy={verticalListSortingStrategy}
        >
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
        </SortableContext>
        {/* Footer */}
        <Box
          ref={setActivatorNodeRef}
          {...listeners}
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
    </div>
  )
}

export default Column
