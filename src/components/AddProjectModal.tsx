import React, { useState, useLayoutEffect, useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getAddProjectModalState } from '../selectors/tasksSelectors'
import { setAddProjectModalOpen, addProject } from '../reducers/tasksReducer'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'

const ModalWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  z-index: 9;
  transition: .3s;
`
const ModalContent = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  background: ${(props: { theme: ITheme }) => props.theme.background};
  border-radius: 12px;
`
const CloseButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 25px;
  left: 20px;
  cursor: pointer;
  color: ${(props: { theme: ITheme }) => props.theme.error};
`
const DoneButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 25px;
  right: 20px;
  cursor: pointer;
  color: ${(props: { theme: ITheme }) => props.theme.success};
`
const ModalHeadline = styled.h2`
  text-align: center;
  font-size: 1.5vw;
  margin-top: 20px;
`
const ModalInput = styled.input`
  display: block;
  margin: 40px auto;
  width: 90%;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  padding: 15px 20px;
  background: ${(props: { theme: ITheme }) => props.theme.background};
  font-size: 18px;
`
const ProjectColors = styled.div`
  display: grid;
  grid-template-rows: 16px 16px;
  grid-template-columns: repeat(10, 16px);
  grid-row-gap: 10px;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto;
`
const ColorItem = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${(props: { color: string, isActive: boolean }) => props.color};

  &:before {
    content: '';
    opacity: ${(props: { isActive: boolean }) => props.isActive ? 1 : 0};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .3s;
    width: 40%;
    height: 40%;
    background: #000;
    border-radius: 50%;
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
    scale: 0,
    x: '-50%',
    y: '-50%',
  },
  animate: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: {
      ease: 'easeIn',
      duration: 0.3,
    },
  },
}
const PROJECT_COLORS = ['#B1BDC2', '#798DF5', '#7DC1E4', '#EBB567', '#B64DB0', '#E36E8C', '#F2D568', '#AACC70', '#EF855F', '#9D75E9', '#4E4E4E', '#84DDC6', '#B29B91', '#A4A4A5', '#DD726B', '#D96ACE', '#4D73EE', '#8354DB', '#9ADFB2', '#50AAD7']
export const AddProjectModal = () => {
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector(getAddProjectModalState)
  const [projectName, setProjectName] = useState('')
  const [activeColor, setActiveColor] = useState(0)
  const { currentTheme } = useContext(ThemeContext)

  useLayoutEffect(() => { // pick random color
    const random = Math.floor(Math.random() * PROJECT_COLORS.length)
    setActiveColor(random)
  }, [])

  const handleClose = () => {
    dispatch(setAddProjectModalOpen(false))
  }
  const handleAddProject = () => {
    if (projectName) {
      dispatch(addProject({
        name: projectName,
        color: activeColor,
      }))
      setProjectName('')
      handleClose()
    }
  }
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }
  const pickColor = (i: number) => {
    setActiveColor(i)
  }
  const preventClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {isModalOpen && <ModalWrapper
        onClick={handleClose}
        initial="initial"
        animate="animate"
        variants={modalWrapperVariants}
        exit={{
          opacity: 0,
        }}
      >
        <ModalContent
          theme={currentTheme}
          onClick={preventClick}
          initial="initial"
          animate="animate"
          variants={modalContentVariants}
          exit={{
            scale: 0,
          }}
        >
          <CloseButton icon={faCircleXmark} onClick={handleClose} theme={currentTheme} />
          <DoneButton icon={faCircleCheck} onClick={handleAddProject} theme={currentTheme} />
          <ModalHeadline>создать новый проект</ModalHeadline>
          <ModalInput
            autoFocus
            type="text"
            placeholder="название нового проекта"
            value={projectName}
            onChange={handleProjectNameChange}
          />
          <ProjectColors>
            {PROJECT_COLORS.map((color, i) => (
              <ColorItem
                color={color} key={i}
                isActive={i === activeColor}
                onClick={() => pickColor(i)}
              />
            ))}
          </ProjectColors>
        </ModalContent>
      </ModalWrapper>}
    </AnimatePresence>
  )
}
