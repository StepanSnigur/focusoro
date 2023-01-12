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
        element: <div>today</div>,
      },
      {
        path: '/list/tomorrow',
        element: <div>tomorrow</div>,
      },
      {
        path: '/list/all',
        element: <AllTasksList />,
      },
      {
        path: '/list/completed',
        element: <div>completed</div>,
      },
      {
        path: '/list/planned',
        element: <div>planned</div>,
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
