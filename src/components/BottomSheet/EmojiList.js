import React from 'react';
import styled from 'styled-components';
import happy from '../../images/emoji/happy.svg';
import surprised from '../../images/emoji/surprised.svg';
import anger from '../../images/emoji/anger.svg';
import sad from '../../images/emoji/sad.svg';
import curious from '../../images/emoji/curious.svg';
import createemoji from '../../images/emoji/createemoji.svg';

const EmojiList = ({openEmojiBar}) => {
  return (
    <Container>
      <EmojiContainer>
        <Emoji>
          <img src={happy} alt='happy'></img>
          <span>2</span>
        </Emoji>
        <Emoji>
          <img src={surprised} alt='surprised'></img>
          <span>2</span>
        </Emoji>
        <Emoji>
          <img src={anger} alt='anger'></img>
          <span>2</span>
        </Emoji>
        <Emoji>
          <img src={sad} alt='sad'></img>
          <span>2</span>
        </Emoji>
        <Emoji>
          <img src={curious} alt='curious'></img>
          <span>2</span>
        </Emoji>
      </EmojiContainer>
      <CreateEmoji onClick={openEmojiBar}>
        <img src={createemoji} alt='createemoji'></img>
      </CreateEmoji>
    </Container>
  );
};

export default EmojiList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Emoji = styled.div`
  width: 49px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.6px;
  border-radius: 14px;
  border: 1px solid #fff;
  box-sizing: border-box;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    color: #fff;
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 14px */
    letter-spacing: -0.28px;
  }
`;

const CreateEmoji = styled.div`
  padding: 4px 11px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;
