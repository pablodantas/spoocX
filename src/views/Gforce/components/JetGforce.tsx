import React from 'react'
import styled, { keyframes } from 'styled-components'

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`

const StyledBackground = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    background-image: url('/images/assets/gforce-header-bg.svg');
    background-repeat: no-repeat;
    width: 385px;
    justify-content: center;
    align-items: center;
  }
`

const Img = styled.img`
  animation: ${float} 4s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
`

const JetGforce = () => {
  return (
    <StyledBackground>
      <Img src="/images/assets/gforce.svg" alt="jet" />
    </StyledBackground>
  )
}

export default JetGforce
