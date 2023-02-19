import { useContext } from 'react'
import { useAppSelector } from '../hooks'
import { getTimerSettings, getCurrentTask } from '../selectors/timerSelectors'
import { getTaskById } from '../selectors/tasksSelectors'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const TimerButtonWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background: #000;
  padding: 20px;
  border-radius: 12px;
`
const ProgressWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 24px;
`
const PlayButton = styled(FontAwesomeIcon)`
  width: 32px;
  height: 32px;
  cursor: pointer;
`
const CurrentTaskName = styled.span`
  font-size: 18px;
  margin-right: 24px;
`

export const TimerButton = () => {
  const timerSettings = useAppSelector(getTimerSettings)
  const currentTaskIds = useAppSelector(getCurrentTask)
  const currentTask = useAppSelector((state) => getTaskById(
    state.tasks,
    currentTaskIds?.listId || '',
    currentTaskIds?.taskId || '',
  ))
  const themeContext = useContext(ThemeContext)
  const currentTheme = themeContext.currentTheme as ITheme

  const handlePlay = () => {
    console.log('play')
  }

  return (
    <TimerButtonWrapper>
      <ProgressWrapper>
        <CircularProgressbar
          minValue={0}
          value={0}
          maxValue={timerSettings.timeInSeconds}
          text={`${Math.ceil(0 / 60)}`}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: currentTheme.color,
            trailColor: currentTheme.background,
            textColor: currentTheme.color,
            textSize: '32px',
          })}
        />
      </ProgressWrapper>
      {currentTask ? <CurrentTaskName>
        {currentTask.name}
      </CurrentTaskName> : null}
      <PlayButton icon={faCirclePlay} onClick={handlePlay} />
    </TimerButtonWrapper>
  )
}
