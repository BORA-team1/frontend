import React from 'react';
import styled from 'styled-components';
import './FloatingBar.css';

const FloatingBar = ({
  addToHighlights,
  handleOpenBottomSheet,
  openEmojiBar,
}) => {
  return (
    <Wrapper>
      <Container>
        <div className='circle1' onClick={addToHighlights}></div>
        <div className='circle2'></div>
        <div className='circle3' onClick={handleOpenBottomSheet}></div>
        <div className='circle4' onClick={openEmojiBar}></div>
      </Container>
    </Wrapper>
  );
};

export default FloatingBar;

const Wrapper = styled.div`
  width: 390px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: fixed;
  bottom: 90px;
  width: 272px;
  height: 61px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 18px;
  border-radius: 52.586px;
  background: var(--card-color, #2b2c3f);
  box-shadow: 0px 4.206896781921387px 6.31034517288208px 0px rgba(0, 0, 0, 0.3);

  div {
    width: 44.172px;
    height: 44.172px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
