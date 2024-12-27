import { Container } from '@mui/material'
import Header from '@/components/Header'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

// Boards List
const BoardPage = () => {
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh',
      }}
    >
      <Header />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}
export default BoardPage
