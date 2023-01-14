import { useContext } from 'react'
import { useAppSelector } from '../hooks'
import { getTodayTasks } from '../selectors/tasksSelectors'
import styled from 'styled-components'
import { TasksListInfo } from '../components/TasksListInfo'
import { TasksListInput } from '../components/TasksListInput'
import { ThemeContext, ITheme } from '../context/themeContext'
import { TasksList } from '../components/TasksList'
import { getFormattedNearDays } from '../utils/dateUtils'

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

export const TodayTasksList = () => {
  const { currentTheme } = useContext(ThemeContext)
  const todayTasks = useAppSelector(getTodayTasks)

  return (
    <TasksListWrapper theme={currentTheme}>
      <TasksHeadline>
        <h3>Задачи на сегодня</h3>
        <button>change sort</button>
      </TasksHeadline>
      <TasksListInfo
        pendingTasks={12}
        completedTasks={0}
        passedTime={253}
      />
      <TasksListInput plannedTaskDate={getFormattedNearDays().today} />
      <TasksList list={todayTasks} />
    </TasksListWrapper>
  )
}
