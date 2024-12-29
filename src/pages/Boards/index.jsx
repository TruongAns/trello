import { Container } from '@mui/material'
import Header from '@/components/Header'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { mockData as boardData } from '@/apis/mockdata'
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
      <BoardContent board={boardData.board} />
    </Container>
  )
}
export default BoardPage
