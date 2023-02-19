import { createSlice } from '@reduxjs/toolkit'
import { ITaskWithListId, getTaskById } from '../selectors/tasksSelectors'

export interface ITask {
  _id: string,
  name: string,
  description: string,
  completed: boolean,
  priorityLevel: number,
  date: string,
}
export interface ITaskIds {
  listId: string,
  taskId: string,
}
export interface IProject {
  _id: string,
  name: string,
  color: string,
  tasks: ITask[],
}
export interface ITasksReducer {
  userTasks: ITask[],
  projects: IProject[],
  sortTerm: sortSettingsNames,
  addProjectModalOpen: boolean,
  openedTask: ITaskIds | null,
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
      description: '',
      completed: true,
      priorityLevel: 5,
      date: '2023-01-12',
    },
  ],
  projects: [
    {
      _id: '1',
      name: 'Test project',
      color: '#000',
      tasks: [
        {
          _id: 'test task',
          name: 'test task',
          description: '',
          completed: false,
          priorityLevel: 4,
          date: '2023-01-14',
        }
      ]
    }
  ],
  sortTerm: 'byDefault',
  addProjectModalOpen: false,
  openedTask: null,
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
    changeTaskDescription: (state, action) => {
      const { listId, taskId, description } = action.payload
      const task = getTaskById(state, listId, taskId)
      task && (task.description = description)
    },
    changeSortTerm: (state, action) => {
      state.sortTerm = action.payload
    },
    setAddProjectModalOpen: (state, action) => {
      state.addProjectModalOpen = action.payload
    },
    addProject: (state, action) => {
      const newProject = {
        _id: Date.now().toString(),
        name: action.payload.name,
        color: action.payload.color,
        tasks: [],
      }
      state.projects.push(newProject)
    },
    openTask: (state, action) => {
      state.openedTask = action.payload
    },
    deleteTask: (state, action) => {
      const { listId, taskId } = action.payload
      if (listId) { // delete from user projects
        const project = state.projects.find(project => project._id === listId)
        if (!project) throw new Error('Project not find')
        project.tasks = project?.tasks.filter(task => task._id !== taskId)
      } else { // delete from user tasks
        state.userTasks = state.userTasks.filter(task => task._id !== taskId)
      }
      state.openedTask = null
    },
    changeTaskPriority: (state, action) => {
      const { listId, taskId, priority } = action.payload
      const task = getTaskById(state, listId, taskId)
      task && (task.priorityLevel = priority)
    },
  }
})

export const {
  addTaskToProject,
  addTaskToUser,
  completeTask,
  changeTaskDescription,
  changeSortTerm,
  setAddProjectModalOpen,
  addProject,
  openTask,
  deleteTask,
  changeTaskPriority,
} = tasksSlice.actions
export default tasksSlice.reducer
