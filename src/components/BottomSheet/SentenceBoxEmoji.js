import React, {useState} from 'react';
import styled from 'styled-components';
import happy from '../../images/emoji/happy.svg';
import surprised from '../../images/emoji/surprised.svg';
import anger from '../../images/emoji/anger.svg';
import sad from '../../images/emoji/sad.svg';
import curious from '../../images/emoji/curious.svg';

const SentenceBoxEmoji = ({lineContent, emoji}) => {
  //감정표현 이미지
  const emojiImages = {
    1: happy,
    2: surprised,
    3: anger,
    4: sad,
    5: curious,
  };

  return (
    <>
      {lineContent && (
        <Container>
          <Sentence>“ {lineContent} ”</Sentence>
          <EmojiContainer>
            {emoji.map((item) => (
              <Emoji key={item.emo_id}>
                <p>
                  <img src={emojiImages[item.content]} alt='Emoji' />
                </p>
              </Emoji>
            ))}

            {/* <SelectButton>
              <span onClick={handleDelete}>삭제</span>
            </SelectButton> */}
          </EmojiContainer>
        </Container>
      )}
    </>
  );
};

export default SentenceBoxEmoji;

const Container = styled.div`
  width: 390px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--sub-background, #242237);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  border-bottom: 1px solid #353646;
`;

const Sentence = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  line-height: 133.5%; /* 20.025px */
  letter-spacing: -0.3px;
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
`;

const Emoji = styled.div`
  display: flex;
  flex-direction: row;
`;

const SelectButton = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;

  span {
    cursor: pointer;
  }
`;
