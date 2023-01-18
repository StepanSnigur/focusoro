import { createSlice } from '@reduxjs/toolkit'
import { ITaskWithListId } from '../selectors/tasksSelectors'

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
  sortTerm: sortSettingsNames,
}

export const SORT_SETTINGS = {
  byDate: {
    translation: 'по дате',
    sortFn: (a: ITaskWithListId, b: ITaskWithListId) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  byDefault: {
    translation: 'по порядку проекта',
    sortFn: () => 1,
  },
  byPriority: {
    translation: 'по приоритету',
    sortFn: (a: ITaskWithListId, b: ITaskWithListId) => b.priorityLevel - a.priorityLevel,
  },
}
export type sortSettingsNames = keyof typeof SORT_SETTINGS
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
  ],
  sortTerm: 'byDefault',
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
    changeSortTerm: (state, action) => {
      state.sortTerm = action.payload
    },
  }
})

export const { addTaskToProject, addTaskToUser, completeTask, changeSortTerm } = tasksSlice.actions
export default tasksSlice.reducer
