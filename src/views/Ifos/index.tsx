import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const Background = styled.div`
  width: 100%;
  background-image: url('/images/assets/bg11.svg');
  background-repeat: no-repeat;
  background-position: top right;
`

const StyledContainer = styled(Container)`
  max-width: 1034px;
`

const Ifos = () => {
  const { path } = useRouteMatch()

  return (
    <Background>
      <Hero />
      <StyledContainer>
        <IfoTabButtons />
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
        <Route path={`${path}/history`}>
          <PastIfo />
        </Route>
      </StyledContainer>
    </Background>
  )
}

export default Ifos
