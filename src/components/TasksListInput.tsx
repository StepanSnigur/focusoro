import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'

const InputWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  margin: 30px 0;
  border-radius: 12px;
  overflow: hidden;
`
const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  padding: 0 24px;
  background: ${(props: { theme: ITheme }) => props.theme.background};
`

export const TasksListInput = () => {
  const { currentTheme } = useContext(ThemeContext)

  return (
    <InputWrapper>
      <Input placeholder="введите название задачи" theme={currentTheme} />
    </InputWrapper>
  )
}
