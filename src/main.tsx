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
      }
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
