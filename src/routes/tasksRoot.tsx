import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import styled from 'styled-components'
import { Sidebar } from '../components/Sidebar'

const TasksWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

export const TasksRoot = () => {
  const lists = useAppSelector(state => state.tasks.lists)

  return (
    <TasksWrapper>
      <Sidebar lists={lists} />
      <Outlet />
    </TasksWrapper>
  )
}
