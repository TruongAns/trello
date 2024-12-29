import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import MessageIcon from '@mui/icons-material/Message'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { BOARD_CONTENT_BG_LIGHT } from '@/pages/Boards/constain.styles'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
const CardItem = props => {
  const { card } = props

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'pointer',
    opacity: isDragging ? '0.5' : undefined,
    border: isDragging ? `1px solid ${BOARD_CONTENT_BG_LIGHT}` : undefined,
    height: card.FE_PlacehoderCard ? '10px' : 'auto',
    // background: card.FE_PlacehoderCard ? 'orange' : 'undefined',
    visibility: card.FE_PlacehoderCard ? 'hidden' : 'visible',
  }

  if (!card?.cover)
    return (
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.15)',
          flexShrink: 0,
        }}
      >
        <CardContent sx={{ padding: '12px 8px', '&:last-child': { padding: '12px 8px' } }}>
          <Typography gutterBottom variant='h5' component='div' sx={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
            {card.title}
          </Typography>
        </CardContent>
      </Card>
    )
  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.15)',
          flexShrink: 0,
        }}
      >
        <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image={card.cover}
          sx={{ WebkitTouchCallout: 'none' }}
        />
        <CardContent sx={{ fontSize: 16, padding: '12px 8px' }}>
          <Typography gutterBottom variant='h5' component='div' sx={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
            {card.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            padding: '0 0 8px 0',
            '& .MuiButton-root': { color: BOARD_CONTENT_BG_LIGHT },
          }}
        >
          <Button size='small' startIcon={<GroupIcon />}>
            {card.memberIds.length}
          </Button>
          <Button size='small' startIcon={<MessageIcon />}>
            {card.comments.length}
          </Button>
          <Button size='small' startIcon={<AttachmentIcon />}>
            {card.attachments.length}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default CardItem
