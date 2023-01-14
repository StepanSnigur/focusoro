import { ITaskWithListId } from '../selectors/tasksSelectors'
import { Task } from './Task'

interface ITasksList {
  list: ITaskWithListId[]
  id?: string
}
export const TasksList: React.FC<ITasksList> = ({ list }) => (
  <div>
    {list.map(task =>  <Task task={task} key={task._id} />)}
  </div>
)
