import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const SliderWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
  display: flex;
  align-items: center;
  z-index: 2;
`
const SliderIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  opacity: ${(props: { active: string }) => (props.active === 'true') ? 1 : .4};
`

interface IPrioritySlider {
  onPriorityChange: (priority: number | null) => void
  priority: number | null
}
export const PrioritySlider: React.FC<IPrioritySlider> = ({ onPriorityChange, priority }) => {
  const [priorityLevel, setPriorityLevel] = useState(-1)
  const MAX_PRIORITY_LEVEL = 5

  useEffect(() => {
    if (priority === null) {
      setPriorityLevel(-1)
    }
  }, [priority])

  const handleMouseLeave = () => {
    setPriorityLevel(priority !== null ? priority : -1)
  }
  const handleHover = (i: number) => {
    setPriorityLevel(i)
  }
  const handleChangePriority = (i: number) => {
    const newLevel = i === priority ? null : i
    onPriorityChange(newLevel)
  }

  return (
    <SliderWrapper onMouseLeave={handleMouseLeave}>
      {new Array(MAX_PRIORITY_LEVEL).fill(null).map((_, i) => (
        <SliderIcon
          icon={faClock}
          key={i}
          onMouseMove={() => handleHover(i)}
          active={(i <= priorityLevel).toString()}
          onClick={() => handleChangePriority(i)}
        />
      ))}
    </SliderWrapper>
  )
}
