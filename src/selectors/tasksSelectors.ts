import { RootState } from '../store'
import { getDiffInDays } from '../utils/dateUtils'

export const getAllTasks = (state: RootState) => {
  const allUserTasks = state.tasks.userTasks
  const allProjectsTasks = state.tasks.projects.map(project => project.tasks).flat()
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
