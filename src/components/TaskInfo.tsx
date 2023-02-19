import React, { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  openTask,
  deleteTask,
  completeTask,
  changeTaskPriority,
  changeTaskDescription,
} from '../reducers/tasksReducer'
import dayjs from 'dayjs'
import * as locale from 'dayjs/locale/ru'
import { getOpenedTask, getOpenedTaskProjectName, ITaskWithListId } from '../selectors/tasksSelectors'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Checkbox } from './Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCalendar, faListCheck, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { PrioritySlider } from './PrioritySlider'

const TaskInfoWrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  z-index: 9;
`
const TaskInfoContent = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  width: 35%;
  height: 100vh;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  background: ${(props: { theme: ITheme }) => props.theme.background};
  padding: 30px;
  padding-right: 60px;
  box-sizing: border-box;
  box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.75);
`
const TaskInfoHeadline = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
const PlayButton = styled(FontAwesomeIcon)`
  margin: 0 12px;
  cursor: pointer;
`
const TaskInfoBlock = styled.div`
  padding: 12px 0;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`
const TaskInfoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`
const TaskDescription = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: none;
  border-top: 1px solid #000;
  background: transparent;
  resize: none;
  outline: none;
  padding: 12px 0;
  font-size: 14px;
`
const TaskBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 30px);
  border-top: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;

  span {
    opacity: .6;
  }
  svg {
    cursor: pointer;
  }
`

const modalWrapperVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: 'easeIn',
      duration: 0.3,
    },
  },
}
const modalContentVariants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: '30px',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}
export const TaskInfo = () => {
  const dispatch = useAppDispatch()
  const currentTask = useAppSelector(getOpenedTask) as ITaskWithListId
  const currentProjectName = useAppSelector(getOpenedTaskProjectName)
  const { currentTheme } = useContext(ThemeContext)

  const handleTaskInfoClose = () => {
    dispatch(openTask(null))
  }
  const preventClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  const handleCompleteTask = (completed: boolean) => {
    dispatch(completeTask({
      completed,
      listId: currentTask?.listId,
      taskId: currentTask?._id,
    }))
  }
  const handlePlay = () => {
    console.log('play', currentTask._id)
  }
  const handlePriorityChange = (priority: number | null) => {
    dispatch(changeTaskPriority({
      listId: currentTask.listId,
      taskId: currentTask._id,
      priority,
    }))
  }
  const handleTaskDelete = () => {
    dispatch(deleteTask({
      listId: currentTask.listId,
      taskId: currentTask._id,
    }))
  }
  const handleTaskDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeTaskDescription({
      listId: currentTask.listId,
      taskId: currentTask._id,
      description: e.target.value,
    }))
  }
  const getTaskCreationDate = () => {
    return dayjs(currentTask._id).locale(locale).format('D MMM')
  }

  return (
    <AnimatePresence>
      {currentTask && <TaskInfoWrapper
        onClick={handleTaskInfoClose}
        initial="initial"
        animate="animate"
        variants={modalWrapperVariants}
        exit={{
          opacity: 0,
        }}
      >
        <TaskInfoContent
          theme={currentTheme}
          onClick={preventClick}
          initial="initial"
          animate="animate"
          variants={modalContentVariants}
          exit={{
            x: '100%',
          }}
        >
          <TaskInfoHeadline>
            <Checkbox
              checked={currentTask.completed}
              onChange={completed => handleCompleteTask(completed)}
            />
            <PlayButton icon={faPlay} onClick={handlePlay} />
            <h3>{currentTask.name}</h3>
            <PrioritySlider priority={currentTask.priorityLevel} onPriorityChange={handlePriorityChange} />
          </TaskInfoHeadline>
          <TaskInfoBlock>
            <div>
              <span><TaskInfoIcon icon={faCalendar} />Срок</span>
              <span>{currentTask.date || 'Не назначен'}</span>
            </div>
            <div>
              <span><TaskInfoIcon icon={faListCheck} />Проект</span>
              <span>{currentProjectName || '-'}</span>
            </div>
          </TaskInfoBlock>
          <TaskDescription
            placeholder="Описание задачи"
            onChange={handleTaskDescriptionChange}
            value={currentTask.description}
          />
          <TaskBottom>
            <FontAwesomeIcon icon={faArrowRight} onClick={handleTaskInfoClose} />
            <span>Создано {getTaskCreationDate()}</span>
            <FontAwesomeIcon icon={faTrash} onClick={handleTaskDelete} />
          </TaskBottom>
        </TaskInfoContent>
      </TaskInfoWrapper>}
    </AnimatePresence>
  )
}
