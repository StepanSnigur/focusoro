import { createSlice } from '@reduxjs/toolkit'

export interface ITask {
  _id: string,
  name: string,
  completed: boolean,
  priorityLevel: number,
}
export interface IProjects {
  _id: string,
  name: string,
  tasks: ITask[],
}
interface ITasksReducer {
  userTasks: ITask[],
  projects: IProjects[],
}

const initialState: ITasksReducer = {
  userTasks: [
    {
      _id: 'test user task',
      name: 'test user task',
      completed: true,
      priorityLevel: 5,
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
        }
      ]
    }
  ]
}
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // createNewList: (state) => {
    //   state.lists.push()
    // }
  }
})

// export const { increment } = tasksSlice.actions
export default tasksSlice.reducer
