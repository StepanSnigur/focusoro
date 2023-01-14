import { createSlice, current } from '@reduxjs/toolkit'

export interface ITask {
  _id: string,
  name: string,
  completed: boolean,
  priorityLevel: number,
  date: string,
}
export interface IProject {
  _id: string,
  name: string,
  tasks: ITask[],
}
interface ITasksReducer {
  userTasks: ITask[],
  projects: IProject[],
}

const initialState: ITasksReducer = {
  userTasks: [
    {
      _id: 'test user task',
      name: 'test user task',
      completed: true,
      priorityLevel: 5,
      date: '2023-01-12',
    },
  ],
  projects: [
    {
      _id: '1',
      name: 'Test project',
      tasks: [
        {
          _id: 'test task',
          name: 'test task',
          completed: false,
          priorityLevel: 5,
          date: '2023-01-14',
        }
      ]
    }
  ]
}
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskToProject: (state, action) => {
      const currentProject = state.projects.find(project => project._id === action.payload.projectId)
      if (currentProject) currentProject?.tasks.push(action.payload.newTask)
    },
    addTaskToUser: (state, action) => {
      state.userTasks.push(action.payload)
    },
    completeTask: (state, action) => {
      const { listId } = action.payload

      if (listId) { // its created project
        const currentProject = state.projects.find(project => project._id === listId)
        const currentTask = currentProject?.tasks.find(task => task._id === action.payload.taskId)
        currentTask && (currentTask.completed = action.payload.completed)
      } else { // its user task
        const currentTask = state.userTasks.find(task => task._id === action.payload.taskId)
        currentTask && (currentTask.completed = action.payload.completed)
      }
    },
  }
})

export const { addTaskToProject, addTaskToUser, completeTask } = tasksSlice.actions
export default tasksSlice.reducer
