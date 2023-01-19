import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getAllTasks, getCompletedTasks, getPlannedTasks, getTodayTasks, getTomorrowTasks } from '../selectors/tasksSelectors'
import styled from 'styled-components'
import { IProject, setAddProjectModalOpen } from '../reducers/tasksReducer'
import { ThemeContext, ITheme } from '../context/themeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-right: 1px solid #000;
  position: relative;
`
const ListLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${(props: {
    active: string,
    theme: ITheme,
  }) => (props.active === 'true') ? props.theme.button : 'transparent'};
  color: ${(props: { theme: ITheme }) => props.theme.color};

  span {
    font-size: 12px;
    opacity: .7;
  }
`
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #000;
  margin: 12px 0;
`
const AddProjectButton = styled.button`
  display: block;
  width: 90%;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`
const AddProjectIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`

interface ISidebar {
  projects: IProject[]
}
export const Sidebar: React.FC<ISidebar> = ({ projects }) => {
  const { listId } = useParams()
  const listName = window.location.pathname.split('/').at(-1)
  const { currentTheme } = useContext(ThemeContext)
  const todayTasks = useAppSelector(getTodayTasks)
  const tomorrowTasks = useAppSelector(getTomorrowTasks)
  const allTasks = useAppSelector(getAllTasks)
  const completedTasks = useAppSelector(getCompletedTasks)
  const plannedTasks = useAppSelector(getPlannedTasks)
  const dispatch = useAppDispatch()

  const handleAddProject = () => {
    dispatch(setAddProjectModalOpen(true))
  }

  return (
    <Wrapper>
      <ListLink
        active={('today' === listName).toString()}
        theme={currentTheme}
        to="/list/today"
      >Сегодня <span>{todayTasks.length}</span></ListLink>
      <ListLink
        active={('tomorrow' === listName).toString()}
        theme={currentTheme}
        to="/list/tomorrow"
      >Завтра <span>{tomorrowTasks.length}</span></ListLink>
      <ListLink
        active={('all' === listName).toString()}
        theme={currentTheme}
        to="/list/all"
      >Все задачи <span>{allTasks.length}</span></ListLink>
      <ListLink
        active={('completed' === listName).toString()}
        theme={currentTheme}
        to="/list/completed"
      >Выполненные <span>{completedTasks.length}</span></ListLink>
      <ListLink
        active={('planned' === listName).toString()}
        theme={currentTheme}
        to="/list/planned"
      >Все запланированные <span>{plannedTasks.length}</span></ListLink>
      <Divider />

      {projects.map(project => (
        <ListLink
          key={project._id}
          to={`/list/${project._id}`}
          active={(project._id === listId).toString()}
          theme={currentTheme}
        >{project.name} <span>{project.tasks.length}</span></ListLink>
      ))}

      <AddProjectButton onClick={handleAddProject}>
        <AddProjectIcon icon={faCirclePlus} />
        добавить проект
      </AddProjectButton>
    </Wrapper>
  )
}
