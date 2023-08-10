import React, {useState} from 'react';
import styled from 'styled-components';
import happy from '../../images/emoji/happy.svg';
import surprised from '../../images/emoji/surprised.svg';
import anger from '../../images/emoji/anger.svg';
import sad from '../../images/emoji/sad.svg';
import curious from '../../images/emoji/curious.svg';

const SentenceBoxEmoji = () => {
  const EmojiList = [
    {emoji: happy, alt: 'happy', number: 1},
    {emoji: surprised, alt: 'surprised', number: 2},
    {emoji: anger, alt: 'anger', number: 3},
    {emoji: sad, alt: 'sad', number: 4},
    {emoji: curious, alt: 'curious', number: 5},
  ];

  const [selectedNumber, setSelectedNumber] = useState(1);
  // 숫자 1로 임시 지정 -> 나중에 데이터 받아서 변경하기
  const selectedEmojiData = EmojiList.find(
    (emojiData) => emojiData.number === selectedNumber
  );

  //이모지 삭제
  const handleDelete = () => {
    setSelectedNumber(null);
  };

  return (
    <>
      {selectedEmojiData && (
        <Container>
          <Sentence>
            “ 혹시 요즘 아스파탐 논란 보고 혹시 요즘 아스파탐 논란 보고
            ‘제로슈거 음료 안 마시는 게 낫나?’ 고민한 사람 있나요? ”
          </Sentence>
          <EmojiContainer>
            <Emoji>
              <p>
                <img
                  src={selectedEmojiData.emoji}
                  alt={selectedEmojiData.alt}
                />
              </p>
            </Emoji>
            <SelectButton>
              <span onClick={handleDelete}>삭제</span>
            </SelectButton>
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
  justify-content: space-between;
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
