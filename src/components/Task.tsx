import React, { useContext } from 'react'
import { ITaskWithListId } from '../selectors/tasksSelectors'
import { useAppDispatch } from '../hooks'
import { completeTask, openTask } from '../reducers/tasksReducer'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { Checkbox } from './Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faClock } from '@fortawesome/free-solid-svg-icons'
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
const TaskPriorityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`
const SliderIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  opacity: ${(props: { active: string }) => (props.active === 'true') ? 1 : .4};
  font-size: 12px;
`
const TaskName = styled.span`
  cursor: pointer;
`

interface ITaskWrapper {
  task: ITaskWithListId
}
export const Task: React.FC<ITaskWrapper> = ({ task }) => {
  const dispatch = useAppDispatch()
  const { currentTheme } = useContext(ThemeContext)

  const handleCompleteTask = (completed: boolean) => {
    dispatch(completeTask({
      completed,
      listId: task.listId,
      taskId: task._id,
    }))
  }
  const handleOpenTask = () => {
    dispatch(openTask({
      listId: task.listId,
      taskId: task._id,
    }))
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
        onChange={(completed) => handleCompleteTask(completed)}
      />
      <PlayButton icon={faPlay} onClick={() => handlePlay(task._id)} />
      <TaskName onClick={handleOpenTask}>{task.name}</TaskName>
      {task.priorityLevel !== null ? <TaskPriorityWrapper>
        {new Array(5).fill(null).map((_, i) => (
          <SliderIcon key={i} icon={faClock} active={(i <= task.priorityLevel).toString()} />
        ))}
      </TaskPriorityWrapper> : null}
      <TaskDate theme={currentTheme} isOverdue={getDiffInDays(task.date) < 0}>{task.date}</TaskDate>
    </TaskWrapper>
  )
}
