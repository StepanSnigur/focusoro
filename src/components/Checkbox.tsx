import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, ITheme } from '../context/themeContext'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
`
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props: {
    checked: boolean,
    theme: ITheme
  }) => (props.checked ? props.theme.error : props.theme.button)};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  };

  ${Icon} {
    visibility: ${(props: { checked: boolean }) => (props.checked ? 'visible' : 'hidden')};
  };
`

interface ICheckbox {
  checked: boolean
  onChange: (checked: boolean) => void
}
export const Checkbox: React.FC<ICheckbox> = ({ checked, onChange }) => {
  const { currentTheme } = useContext(ThemeContext)

  return (
    <CheckboxContainer onClick={() => onChange(!checked)}>
      <HiddenCheckbox checked={checked} onChange={() => onChange(!checked)} />
      <StyledCheckbox checked={checked} theme={currentTheme}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
