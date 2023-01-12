import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks'

export const TasksList = () => {
  const { listId } = useParams()
  const activeList = useAppSelector(state => state.tasks.lists.find(list => list._id === listId))

  if (!listId || !activeList) return <div>error</div>
  return (
    <div>
      list {activeList.name}
      {activeList.tasks.map(task => (
        <div key={task._id}>
          task {task.name}
        </div>
      ))}
    </div>
  )
}
