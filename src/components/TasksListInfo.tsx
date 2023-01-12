import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'

const TasksListInfoWrapper = styled.div`
  background: ${(props: { theme: ITheme }) => props.theme.background};
  padding: 12px;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  h4 {
    margin: 0;
    padding: 0;
    font-size: 32px;
    color: ${(props: { theme: ITheme }) => props.theme.error};
    margin-bottom: 12px;
    margin-top: 12px;

    span {
      color: ${(props: { theme: ITheme }) => props.theme.color};
      position: absolute;
    }
  }
  span {
    font-size: 12px;
  }
`
const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface ITasksListInfo {
  pendingTasks: number
  completedTasks: number
  passedTime: number
}
export const TasksListInfo: React.FC<ITasksListInfo> = ({
  pendingTasks,
  completedTasks,
  passedTime,
}) => {
  const { currentTheme } = useContext(ThemeContext)

  return (
    <TasksListInfoWrapper theme={currentTheme}>
      <Indicator>
        <h4>{pendingTasks}</h4>
        <span>ожидают выполнения</span>
      </Indicator>
      <Indicator>
        <h4>{completedTasks}</h4>
        <span>выполнены</span>
      </Indicator>
      <Indicator>
        <h4>{passedTime}<span>m</span></h4>
        <span>потраченное время</span>
      </Indicator>
    </TasksListInfoWrapper>
  )
}
