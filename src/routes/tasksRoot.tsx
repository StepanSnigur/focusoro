import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import styled from 'styled-components'
import { Sidebar } from '../components/Sidebar'
import { AddProjectModal } from '../components/AddProjectModal'
import { TaskInfo } from '../components/TaskInfo'

const TasksWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

export const TasksRoot = () => {
  const projects = useAppSelector(state => state.tasks.projects)

  return (
    <TasksWrapper>
      <Sidebar projects={projects} />
      <Outlet />
      <AddProjectModal />
      <TaskInfo />
    </TasksWrapper>
  )
}
