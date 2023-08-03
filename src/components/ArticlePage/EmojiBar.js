import React from 'react';
import styled from 'styled-components';
import happy from '../../images/emoji/🥰.svg';
import surprised from '../../images/emoji/😲.svg';
import anger from '../../images/emoji/😡.svg';
import sad from '../../images/emoji/😭.svg';
import curious from '../../images/emoji/🧐.svg';

const EmojiBar = ({closeEmojiBar}) => {
  return (
    <Wrapper onClick={closeEmojiBar}>
      <Container>
        <div>
          <img src={happy} alt='happy' onClick={closeEmojiBar}></img>
        </div>
        <div>
          <img src={surprised} alt='surprised' onClick={closeEmojiBar}></img>
        </div>
        <div>
          <img src={anger} alt='anger' onClick={closeEmojiBar}></img>
        </div>
        <div>
          <img src={sad} alt='sad' onClick={closeEmojiBar}></img>
        </div>
        <div>
          <img src={curious} alt='curious' onClick={closeEmojiBar}></img>
        </div>
      </Container>
    </Wrapper>
  );
};

export default EmojiBar;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: fixed;
  bottom: 90px;
  width: 335px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44.172px;
    height: 44.172px;
    background-color: #4f5170;
    border-radius: 50%;
  }

  div > img {
    cursor: pointer;
  }
`;
