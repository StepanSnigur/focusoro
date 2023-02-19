import { createSlice } from '@reduxjs/toolkit'

interface ITimerSettings {
  background: string,
  timeInSeconds: number,
  sound: string,
}
interface ITimerStatistics {
  focusedToday: number,
}
interface ICurrentTask {
  listId: string,
  taskId: string,
}
export interface ITimerReducer {
  timerSettings: ITimerSettings,
  statistics: ITimerStatistics,
  currentTask: ICurrentTask | null,
  timeInWork: number,
}

const initialState: ITimerReducer = {
  timerSettings: {
    background: '#eee',
    timeInSeconds: 25 * 60, // 25 minutes
    sound: 'sound link',
  },
  statistics: {
    focusedToday: 0,
  },
  currentTask: null,
  timeInWork: 0,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload
    },
  },
})

export const {
  setCurrentTask,
} = timerSlice.actions
export default timerSlice.reducer
