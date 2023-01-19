import { useContext } from 'react'
import { useAppSelector } from '../hooks'
import { getActiveSortData, getCompletedTasks } from '../selectors/tasksSelectors'
import styled from 'styled-components'
import { TasksListInfo } from '../components/TasksListInfo'
import { ThemeContext, ITheme } from '../context/themeContext'
import { TasksList } from '../components/TasksList'
import { SortButton } from '../components/SortButton'
import { Task } from '../components/Task'

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

export const CompletedTasksList = () => {
  const { currentTheme } = useContext(ThemeContext)
  const activeSortData = useAppSelector(getActiveSortData)
  const completedTasks = useAppSelector(getCompletedTasks)
  const sortedList = completedTasks.sort(activeSortData.sortFn)

  return (
    <TasksListWrapper theme={currentTheme}>
      <TasksHeadline>
        <h3>Завершенные задачи</h3>
        <SortButton />
      </TasksHeadline>
      <TasksListInfo
        pendingTasks={12}
        completedTasks={0}
        passedTime={253}
      />
      {sortedList.map(task => <Task task={task} key={task._id} />)}
    </TasksListWrapper>
  )
}
