import { RootState } from '../store'
import { ITasksReducer, IProject, ITask, SORT_SETTINGS } from '../reducers/tasksReducer'
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

export const getTaskById = (tasks: ITasksReducer, listId: string, taskId: string) => {
  if (listId) { // get from user projects
    const project = tasks.projects.find(project => project._id === listId)
    return project?.tasks.find(task => task._id === taskId)
  } else { // get from user tasks
    return tasks.userTasks.find(task => task._id === taskId)
  }
}
export const getOpenedTask = (state: RootState) => {
  if (!state.tasks.openedTask) return null
  const { listId, taskId } = state.tasks.openedTask

  if (listId) { // get from user projects
    const project = state.tasks.projects.find(project => project._id === listId)
    const task = project?.tasks.find(task => task._id === taskId)
    return {
      ...task,
      listId: project?._id,
    }
  } else { // get from user tasks
    return state.tasks.userTasks.find(task => task._id === taskId)
  }
}
export const getOpenedTaskProjectName = (state: RootState) => {
  if (!state.tasks.openedTask) return null
  const { listId } = state.tasks.openedTask
  return state.tasks.projects.find(project => project._id === listId)?.name
}
