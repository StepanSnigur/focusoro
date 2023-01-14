import { useContext } from 'react'
import { useAppSelector } from '../hooks'
import { getPlannedTasks } from '../selectors/tasksSelectors'
import styled from 'styled-components'
import { TasksListInfo } from '../components/TasksListInfo'
import { TasksListInput } from '../components/TasksListInput'
import { ThemeContext, ITheme } from '../context/themeContext'
import { TasksList } from '../components/TasksList'

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

export const PlannedTasksList = () => {
  const { currentTheme } = useContext(ThemeContext)
  const plannedTasks = useAppSelector(getPlannedTasks)

  return (
    <TasksListWrapper theme={currentTheme}>
      <TasksHeadline>
        <h3>Запланированные задачи</h3>
        <button>change sort</button>
      </TasksHeadline>
      <TasksListInfo
        pendingTasks={12}
        completedTasks={0}
        passedTime={253}
      />
      <TasksListInput />
      <TasksList list={plannedTasks} />
    </TasksListWrapper>
  )
}
