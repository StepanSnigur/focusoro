import React, { useContext, useState } from 'react'
import { ITask } from '../reducers/tasksReducer'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { Checkbox } from './Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const Task = styled.div`
  width: 100%;
  border-radius: 12px;
  background: ${(props: { theme: ITheme }) => props.theme.background};
  margin-bottom: 8px;
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

interface ITasksList {
  list: ITask[]
}
export const TasksList: React.FC<ITasksList> = ({ list }) => {
  const { currentTheme } = useContext(ThemeContext)

  const handleCompleteTask = (completed: boolean, id: string) => {
    console.log(completed, id, 'task')
  }
  const handlePlay = (id: string) => {
    console.log('play', id)
  }

  return (
    <div>
      {list.map(task => (
        <Task
          key={task._id}
          theme={currentTheme}
        >
          <Checkbox
            checked={task.completed}
            onChange={(completed) => handleCompleteTask(completed, task._id)}
          />
          <PlayButton icon={faPlay} onClick={() => handlePlay(task._id)} />
          <span>{task.name}</span>
        </Task>
      ))}
    </div>
  )
}
