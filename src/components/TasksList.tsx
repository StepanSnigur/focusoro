import { useState } from 'react'
import { useAppSelector } from '../hooks'
import { getActiveSortData } from '../selectors/tasksSelectors'
import styled from 'styled-components'
import { ITaskWithListId } from '../selectors/tasksSelectors'
import { Task } from './Task'

const CompletedButton = styled.button`
  display: block;
  margin: 20px auto 8px auto;
  font-size: 14px;
`

interface ITasksList {
  list: ITaskWithListId[]
  id?: string
}
export const TasksList: React.FC<ITasksList> = ({ list }) => {
  const activeSortData = useAppSelector(getActiveSortData)
  const [ completedOpen, setCompletedOpen ] = useState(false)

  const sortedList = list.sort(activeSortData.sortFn)
  const inProgress = sortedList.filter(task => !task.completed)
  const completed = sortedList.filter(task => task.completed)

  const handleCompletedOpen = () => {
    setCompletedOpen(prevState => !prevState)
  }

  return (
    <div>
      {inProgress.map(task =>  <Task task={task} key={task._id} />)}
      {completed.length >= 1
        ? <CompletedButton
          onClick={handleCompletedOpen}
        >{completedOpen ? 'скрыть' : 'показать'} выполненные</CompletedButton>
        : null}
      {completedOpen ? completed.map(task =>  <Task task={task} key={task._id} />) : null}
    </div>
  )
}
