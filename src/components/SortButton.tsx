import { useState, useContext } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getActiveSortTerm } from '../selectors/tasksSelectors'
import { ThemeContext, ITheme } from '../context/themeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { SORT_SETTINGS, sortSettingsNames } from '../reducers/tasksReducer'
import { changeSortTerm } from '../reducers/tasksReducer'

const SortButtonWrapper = styled.button`
  position: relative;

  &:focus {
    outline: none;
  }
`
const SortButtonContentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 4;
  cursor: auto;
`
const SortButtonContent = styled.div`
  min-width: 160px;
  max-height: ${(props: { active: string }) => (props.active === 'true') ? '140px' : 0};
  overflow: hidden;
  transition: .3s;
  position: absolute;
  right: 0;
  top: 120%;
  background: ${(props: { theme: ITheme }) => props.theme.button};
  padding: ${(props: { active: string }) => (props.active === 'true') ? '12px' : 0};
  border-radius: 8px;
  box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.75);
  z-index: 5;
`
const SortOption = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  margin-bottom: 5px;
  transition: .3s;

  &:before {
    content: '';
    opacity: ${(props: { active: string }) => (props.active === 'true') ? 1 : 0};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props: { theme: ITheme }) => props.theme.color};
    transition: .3s;
  }
  &:hover {
    background: ${(props: { theme: ITheme }) => props.theme.secondaryBackground};
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export const SortButton = () => {
  const dispatch = useAppDispatch()
  const { currentTheme } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)
  const settingsNames = Object.keys(SORT_SETTINGS) as sortSettingsNames[]
  const activeSortTerm = useAppSelector(getActiveSortTerm)

  const handleSetIsOpen = () => {
    setIsOpen(prevState => !prevState)
  }
  const handleChangeSortOption = (option: sortSettingsNames) => {
    dispatch(changeSortTerm(option))
  }

  return (
    <SortButtonWrapper onClick={handleSetIsOpen}>
      <FontAwesomeIcon icon={faSort} />
      {isOpen ? <SortButtonContentWrapper /> : null}
      <SortButtonContent theme={currentTheme} active={isOpen.toString()}>
        {settingsNames.map((key: sortSettingsNames, i) => (
          <SortOption
            key={i}
            theme={currentTheme}
            active={(activeSortTerm === key).toString()}
            onClick={() => handleChangeSortOption(key)}
          >
            {SORT_SETTINGS[key].translation}
          </SortOption>
        ))}
      </SortButtonContent>
    </SortButtonWrapper>
  )
}
