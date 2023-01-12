import { createSlice } from '@reduxjs/toolkit'

export interface ITask {
  _id: string,
  name: string,
  completed: boolean,
  priorityLevel: number,
}
export interface ITasksList {
  _id: string,
  name: string,
  tasks: ITask[],
}
interface ITasksReducer {
  lists: ITasksList[],
}

const initialState: ITasksReducer = {
  lists: [
    {
      _id: '1',
      name: 'Задачи',
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
