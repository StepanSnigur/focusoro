import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './reducers/tasksReducer'
import timerReducer from './reducers/timerReducer'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
