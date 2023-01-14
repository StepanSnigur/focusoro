import React, { useContext } from 'react'
import { ITask } from '../reducers/tasksReducer'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { Checkbox } from './Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { getDiffInDays } from '../utils/dateUtils'

const TaskWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  background: ${(props: { theme: ITheme }) => props.theme.background};
  margin-top: 8px;
  padding: 12px 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  span {
    margin-left: 15px;
  }
`
const PlayButton = styled(FontAwesomeIcon)`
  margin-left: 12px;
`
const TaskDate = styled.h5`
  color: ${(props: {
    theme: ITheme,
    isOverdue: boolean,
  }) => props.isOverdue ? props.theme.error : props.theme.color};
  margin: 0;
  padding: 0;
  margin-left: auto;
`

interface ITaskWrapper {
  task: ITask
}
export const Task: React.FC<ITaskWrapper> = ({ task }) => {
  const { currentTheme } = useContext(ThemeContext)

  const handleCompleteTask = (completed: boolean, id: string) => {
    console.log(completed, id, 'task')
  }
  const handlePlay = (id: string) => {
    console.log('play', id)
  }

  return (
    <TaskWrapper
      theme={currentTheme}
    >
      <Checkbox
        checked={task.completed}
        onChange={(completed) => handleCompleteTask(completed, task._id)}
      />
      <PlayButton icon={faPlay} onClick={() => handlePlay(task._id)} />
      <span>{task.name}</span>
      <TaskDate theme={currentTheme} isOverdue={getDiffInDays(task.date) < 0}>{task.date}</TaskDate>
    </TaskWrapper>
  )
}
