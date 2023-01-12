import { RootState } from '../store'

export const getAllTasks = (state: RootState) => {
  const allUserTasks = state.tasks.userTasks
  const allProjectsTasks = state.tasks.projects.map(project => project.tasks).flat()
  return [...allUserTasks, ...allProjectsTasks]
}
