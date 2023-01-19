import { RootState } from '../store'
import { IProject, ITask, SORT_SETTINGS } from '../reducers/tasksReducer'
import { getDiffInDays } from '../utils/dateUtils'

export interface ITaskWithListId extends ITask {
  listId?: string,
}
export const getCurrentProject = (id: string) => (state: RootState) => {
  const currentProject = {...state.tasks.projects.find(project => project._id === id)} as IProject

  if (!currentProject) return null
  const tasksWithListId = currentProject.tasks.map(task => {
    const newTask = {...task} as ITaskWithListId
    newTask.listId = currentProject._id
    return newTask
  })
  currentProject.tasks = tasksWithListId
  return currentProject
}
export const getAllTasks = (state: RootState) => {
  const allUserTasks = [...state.tasks.userTasks].map(task => {
    const newTask = {...task} as ITaskWithListId
    newTask.listId = undefined
    return newTask
  })
  const allProjectsTasks = state.tasks.projects.map(project => {
    return project.tasks.map(task => {
      const newTask = {...task} as ITaskWithListId
      newTask.listId = project._id
      return newTask
    })
  }).flat()
  return [...allUserTasks, ...allProjectsTasks]
}
export const getTodayTasks = (state: RootState) => {
  const allTasks = getAllTasks(state)
  return allTasks.filter(task => {
    const diff = getDiffInDays(task.date)
    return diff === 0
  })
}
export const getTomorrowTasks = (state: RootState) => {
  const allTasks = getAllTasks(state)
  return allTasks.filter(task => {
    const diff = getDiffInDays(task.date)
    return diff === 1
  })
}
export const getPlannedTasks = (state: RootState) => {
  const allTasks = getAllTasks(state)
  return allTasks.filter(task => {
    const diff = getDiffInDays(task.date)
    return diff >= 1
  })
}
export const getCompletedTasks = (state: RootState) => {
  const allTasks = getAllTasks(state)
  return allTasks.filter(task => task.completed)
}
export const getActiveSortTerm = (state: RootState) => {
  return state.tasks.sortTerm
}
export const getActiveSortData = (state: RootState) => {
  return SORT_SETTINGS[state.tasks.sortTerm]
}
export const getAddProjectModalState = (state: RootState) => {
  return state.tasks.addProjectModalOpen
}
