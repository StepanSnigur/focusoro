import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { TasksListInfo } from '../components/TasksListInfo'
import { TasksListInput } from '../components/TasksListInput'
import { TasksList as TasksListItem } from '../components/TasksList'

const TasksListWrapper = styled.div`
  background: ${(props: { theme: ITheme }) => props.theme.secondaryBackground};
  padding: 20px 35px;
  box-sizing: border-box;
`
const TasksHeadline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-size: 24px;
  }
`

export const TasksList = () => {
  const { listId } = useParams()
  const activeList = useAppSelector(state => state.tasks.projects.find(projejct => projejct._id === listId))
  const { currentTheme } = useContext(ThemeContext)

  if (!listId || !activeList) return <div>error</div>
  return (
    <TasksListWrapper theme={currentTheme}>
      <TasksHeadline>
        <h3>{activeList.name}</h3>
        <button>change sort</button>
      </TasksHeadline>
      <TasksListInfo
        pendingTasks={12}
        completedTasks={0}
        passedTime={253}
      />
      <TasksListInput />
      <TasksListItem list={activeList.tasks} />
    </TasksListWrapper>
  )
}
