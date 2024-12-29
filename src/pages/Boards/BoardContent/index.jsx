import { Box, useTheme } from '@mui/material'
import { HEADER_HEIGHT, BOARD_BAR_HEIGHT } from '../constain.styles'
import { BOARD_CONTENT_BG_DARK, BOARD_CONTENT_BG_LIGHT, BOARD_CONTENT_PADDING } from '@/pages/Boards/constain.styles'
import Column from './Column/Column'

import { mapOrder } from '@/apis/sort'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
} from '@dnd-kit/core'

import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import CardItem from './Column/CardItem/CardItem'

const BoardContent = ({ board }) => {
  const theme = useTheme()
  const mode = theme.palette.mode

  const [columnsSorted, setColumnsSorted] = useState([])

  useEffect(() => {
    const columns = board.columns
    const columnOrderIds = board.columnOrderIds
    const columnSort = mapOrder(columns, columnOrderIds, '_id')
    setColumnsSorted(columnSort)
  }, [board])

  const [typeDrag, setTypeDrag] = useState(null)
  const [idElementDrag, setIdElementDrag] = useState(null)
  const [dataElementDrag, setDataElementDrag] = useState(null)

  const lastOverId = useRef(null)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Số pixel di chuyển tối thiểu để kích hoạt kéo
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // Thời gian trễ (ms) trước khi bắt đầu kéo
      tolerance: 100, // Di chuyển ít nhất 10px trước khi bắt đầu kéo
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  }

  function getTypeByDataElement(dataElement) {
    if (dataElement.cards) {
      return 'COLUMN'
    }
    return 'CARD'
  }

  const collisionDetectionStrategy = useCallback(
    args => {
      if (typeDrag === 'COLUMN') {
        return closestCorners({ ...args })
      }
      const pointerIntersections = pointerWithin(args)
      if (pointerIntersections.length < 1) return
      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        // console.log({ overId })
        const overColumn = [...columnsSorted].find(column => column._id === overId)
        if (overColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(container => {
              return (
                container.id != overId &&
                idElementDrag != container.id &&
                overColumn.cardOrderIds.includes(container.id)
              )
            }),
          })[0]?.id
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [typeDrag, columnsSorted, idElementDrag],
  )

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        onDragOver={handleOnDragOver}
        collisionDetection={collisionDetectionStrategy}
      >
        <SortableContext items={columnsSorted.map(column => column._id)}>
          <Box
            sx={{
              width: '100%',
              height: `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT})`,
              display: 'flex',
              alignItems: 'flex-start',
              backgroundColor: mode == 'dark' ? BOARD_CONTENT_BG_DARK : BOARD_CONTENT_BG_LIGHT,
              padding: BOARD_CONTENT_PADDING,
              overflowY: 'hidden',
            }}
          >
            {[...columnsSorted].map(column => {
              return <Column column={column} key={column._id} />
            })}
          </Box>
        </SortableContext>
        <DragOverlay dropAnimation={dropAnimation}>
          {typeDrag === null && null}
          {typeDrag === 'COLUMN' && <Column column={dataElementDrag}> </Column>}
          {typeDrag === 'CARD' && <CardItem card={dataElementDrag}> </CardItem>}
        </DragOverlay>
      </DndContext>
    </>
  )

  function handleOnDragStart(event) {
    const { data, id } = event.active
    const dataElement = data?.current
    const type = getTypeByDataElement(dataElement)
    setTypeDrag(type)
    setIdElementDrag(id)
    setDataElementDrag(dataElement)
  }

  function handleOnDragOver(event) {
    const { active, over } = event
    if (!active || !over) return
    if (typeDrag === 'COLUMN') return

    const {
      data: { current: dataActive },
      id: idActive,
    } = active
    const {
      data: { current: dataOver },
      id: idOver,
    } = over

    if (typeDrag === 'CARD') {
      if (getTypeByDataElement(dataActive) === getTypeByDataElement(dataOver)) {
        const idColumnActive = dataActive.columnId
        const idColumnOver = dataOver.columnId

        if (idColumnOver && idColumnActive && idColumnActive !== idColumnOver) {
          // Delete Card in Active Column
          setColumnsSorted(prevColumn => {
            const nextColumns = cloneDeep(prevColumn)
            const activeColumn = nextColumns.find(column => column._id === idColumnActive)
            activeColumn.cards = activeColumn.cards.filter(card => card._id != idActive)
            if (isEmpty(activeColumn.cards)) {
              const newCard = createCardByColumn(activeColumn)
              activeColumn.cards.push(newCard)
            }

            activeColumn.cardOrderIds = activeColumn.cards.map(card => card._id)
            return nextColumns
          })

          // Add Card in Over Column
          setColumnsSorted(prevColumn => {
            const nextColumns = cloneDeep(prevColumn)
            const activeColumn = nextColumns.find(column => column._id === idColumnOver)
            // console.log({ activeColumn })

            const overIndex = activeColumn.cardOrderIds.findIndex(id => id === idOver)
            // console.log({ overIndex })

            let newIndex
            const isBelowOverItem =
              active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

            const modifier = isBelowOverItem ? 1 : 0

            newIndex = overIndex >= 0 ? overIndex + modifier : activeColumn.cards.length + 1

            activeColumn.cardOrderIds = activeColumn.cardOrderIds.filter(id => id != idActive)
            activeColumn.cards = activeColumn.cards.filter(card => card._id != idActive)
            // Delete PlaceHoder card FE
            activeColumn.cardOrderIds = activeColumn.cardOrderIds.filter(id => !id.includes('placehoder'))
            activeColumn.cards = activeColumn.cards.filter(card => card.FE_PlacehoderCard != true)

            activeColumn.cardOrderIds.splice(newIndex, 0, idActive)
            // console.log({ dataActive })
            dataActive.columnId = idColumnOver

            activeColumn.cards.push(dataActive)
            // console.log({ activeColumn })

            return nextColumns
          })
        }
      }
    }
  }

  function handleOnDragEnd(event) {
    const { active, over } = event
    if (!active || !over) return

    const {
      data: { current: dataActive },
      id: idActive,
    } = active
    const {
      data: { current: dataOver },
      id: idOver,
    } = over

    if (typeDrag === 'COLUMN') {
      const oldIndex = columnsSorted.findIndex(column => column._id === idActive)
      const newIndex = columnsSorted.findIndex(column => column._id === idOver)
      setColumnsSorted(preColumns => {
        const cloneColumns = cloneDeep(preColumns)
        const nextColumns = arrayMove(cloneColumns, oldIndex, newIndex)
        return nextColumns
      })
    }

    if (typeDrag === 'CARD') {
      if (getTypeByDataElement(dataActive) === getTypeByDataElement(dataOver)) {
        const idColumnActive = dataActive.columnId
        const idColumnOver = dataOver.columnId

        if (idColumnActive === idColumnOver) {
          // console.log({ idActive })
          // console.log({ idOver })
          setColumnsSorted(prevColumns => {
            const nextColumns = cloneDeep(prevColumns)
            const activeColumn = nextColumns.find(column => column._id === idColumnActive)

            const oldIndex = activeColumn.cardOrderIds.findIndex(id => id === idActive)

            const newIndex = activeColumn.cardOrderIds.findIndex(id => id === idOver)
            activeColumn.cardOrderIds = arrayMove(activeColumn.cardOrderIds, oldIndex, newIndex)
            return nextColumns
          })
        }
      }
    }

    setTypeDrag(null)
    setIdElementDrag(null)
    setDataElementDrag(null)
  }

  function createCardByColumn(column) {
    return {
      _id: `${column._id}-card-placehoder`,
      boardId: `${column.boardId}`,
      columnId: `${column._id}`,
      FE_PlacehoderCard: true,
    }
  }
}

export default BoardContent
