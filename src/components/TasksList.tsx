import { ITask } from '../reducers/tasksReducer'
import { Task } from './Task'

interface ITasksList {
  list: ITask[]
}
export const TasksList: React.FC<ITasksList> = ({ list }) => (
  <div>
    {list.map(task =>  <Task task={task} key={task._id} />)}
  </div>
)
