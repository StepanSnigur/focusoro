import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../hooks'
import { addTaskToProject, addTaskToUser } from '../reducers/tasksReducer'
import { ThemeContext, ITheme } from '../context/themeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPlus } from '@fortawesome/free-solid-svg-icons'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import dayjs, { Dayjs } from 'dayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { PrioritySlider } from './PrioritySlider'

const InputWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  margin: 30px 0;
  border-radius: 12px;
`
const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  padding: 0 38px;
  background: ${(props: { theme: ITheme }) => props.theme.background};
`
const CalendarButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  cursor: pointer;
`
const CalendarRange = styled(DesktopDatePicker)`
  position: absolute;
  top: 60px;
  right: 0;
`
const InvisibleTextField = styled(TextField)`
  visibility: hidden;
  z-index: -1;
  position: absolute !important;
  right: 0;
  top: 0;
`
const PlusIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  cursor: pointer;
  z-index: 2;
`

interface ITaskListInput {
  listId?: string
  plannedTaskDate?: string
}
export const TasksListInput: React.FC<ITaskListInput> = ({ listId, plannedTaskDate }) => {
  const dispatch = useAppDispatch()
  const { currentTheme } = useContext(ThemeContext)
  const [taskName, setTaskName] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [taskDate, setTaskDate] = useState<Dayjs | null>(dayjs(plannedTaskDate) || dayjs())
  const [taskPriority, setTaskPriority] = useState<number | null>(null)

  const handleChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value)
  }
  const handleAddTask = () => {
    if (taskName.length === 0) return false

    const formattedDate = dayjs(taskDate).format('YYYY-MM-DD')
    const newTask = {
      _id: Date.now(),
      name: taskName,
      description: '',
      completed: false,
      priorityLevel: taskPriority,
      date: formattedDate,
    }

    if (listId) {
      dispatch(addTaskToProject({
        newTask,
        projectId: listId,
      }))
    } else {
      dispatch(addTaskToUser(newTask))
    }

    setTaskName('')
    setTaskPriority(null)
    setIsCalendarOpen(false)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }
  const handleOpenCalendar = () => {
    setIsCalendarOpen(prevState => !prevState)
  }
  const handleCalendarChange = (date: unknown) => {
    setTaskDate(date as Dayjs)
    setIsCalendarOpen(false)
  }
  const handlePriorityChange = (priority: number | null) => {
    setTaskPriority(priority)
  }

  return (
    <InputWrapper>
      <PlusIcon icon={faPlus} onClick={handleAddTask} />
      <Input
        placeholder="введите название задачи"
        theme={currentTheme}
        value={taskName}
        onChange={handleChangeTaskName}
        onKeyDown={handleKeyDown}
      />
      <PrioritySlider onPriorityChange={handlePriorityChange} priority={taskPriority} />
      {plannedTaskDate ? null : <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarRange
          label="выберите дату"
          inputFormat="MM/DD/YYYY"
          value={taskDate}
          onChange={handleCalendarChange}
          open={isCalendarOpen}
          minDate={dayjs()}
          renderInput={(params) =><><InvisibleTextField {...params} />
            <CalendarButton icon={faCalendar} onClick={handleOpenCalendar} />
          </>}
        />
      </LocalizationProvider>}
    </InputWrapper>
  )
}
