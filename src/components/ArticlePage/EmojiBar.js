import React, {useState} from 'react';
import styled from 'styled-components';
import happy from '../../images/emoji/happy.svg';
import surprised from '../../images/emoji/surprised.svg';
import anger from '../../images/emoji/anger.svg';
import sad from '../../images/emoji/sad.svg';
import curious from '../../images/emoji/curious.svg';

const EmojiBar = ({
  closeEmojiBar,
  isBottomSheetOpen,
  handleOpenBottomSheet,
  showListC,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelect = (number) => {
    console.log(number);
    setSelectedEmoji(number);
    //저장 후 이모지 바를 바로 닫아버려서 콘솔에 null만 뜸
    console.log(selectedEmoji);
    closeEmojiBar();
    if (!isBottomSheetOpen) {
      handleOpenBottomSheet();
      showListC();
    }
  };

  return (
    <Wrapper onClick={closeEmojiBar}>
      <Container onClick={(e) => e.stopPropagation()}>
        <div>
          <img
            src={happy}
            alt='happy'
            onClick={() => handleEmojiSelect(1)}
          ></img>
        </div>
        <div>
          <img
            src={surprised}
            alt='surprised'
            onClick={() => handleEmojiSelect(2)}
          ></img>
        </div>
        <div>
          <img
            src={anger}
            alt='anger'
            onClick={() => handleEmojiSelect(3)}
          ></img>
        </div>
        <div>
          <img src={sad} alt='sad' onClick={() => handleEmojiSelect(4)}></img>
        </div>
        <div>
          <img
            src={curious}
            alt='curious'
            onClick={() => handleEmojiSelect(5)}
          ></img>
        </div>
      </Container>
    </Wrapper>
  );
};

export default EmojiBar;

const Wrapper = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: absolute;
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
    z-index: 3;
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
