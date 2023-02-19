import { RootState } from '../store'

export const getTimerSettings = (state: RootState) => state.timer.timerSettings
export const getCurrentTask = (state: RootState) => state.timer.currentTask
