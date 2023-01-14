import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App'
import { TasksRoot } from './routes/tasksRoot'
import { TasksList } from './routes/tasksList'
import './index.css'
import { ThemeProvider } from './context/themeContext'
import { AllTasksList } from './routes/allTasksList'
import { TodayTasksList } from './routes/todayTasksList'
import { TomorrowTasksList } from './routes/tomorrowTasksList'
import { CompletedTasksList } from './routes/completedTasksList'
import { PlannedTasksList } from './routes/plannedTasksList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/list',
    element: <TasksRoot />,
    children: [
      {
        path: '/list/:listId',
        element: <TasksList />,
      },
      {
        path: '/list/today',
        element: <TodayTasksList />,
      },
      {
        path: '/list/tomorrow',
        element: <TomorrowTasksList />,
      },
      {
        path: '/list/all',
        element: <AllTasksList />,
      },
      {
        path: '/list/completed',
        element: <CompletedTasksList />,
      },
      {
        path: '/list/planned',
        element: <PlannedTasksList />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
