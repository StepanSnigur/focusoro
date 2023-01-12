import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ITasksList } from '../reducers/tasksReducer'

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-right: 1px solid #000;
`
const ListLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${(props: { active: string }) => (props.active === 'true') ? '#F5F5F5' : 'transparent'} ;
`

interface ISidebar {
  lists: ITasksList[]
}
export const Sidebar: React.FC<ISidebar> = ({ lists }) => {
  const { listId } = useParams()

  return (
    <Wrapper>
      {lists.map(list => (
        <ListLink
          key={list._id}
          to={`/list/${list._id}`}
          active={(list._id === listId).toString()}
        >{list.name}</ListLink>
      ))}
    </Wrapper>
  )
}
