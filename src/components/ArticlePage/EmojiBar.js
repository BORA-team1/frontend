import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

//images
import happy from '../../images/emoji/happy.svg';
import surprised from '../../images/emoji/surprised.svg';
import anger from '../../images/emoji/anger.svg';
import sad from '../../images/emoji/sad.svg';
import curious from '../../images/emoji/curious.svg';

//context
import {useAuth} from '../../contexts/AuthContext';
import {usePost} from '../../contexts/PostContext';

const EmojiBar = ({
  closeEmojiBar,
  isBottomSheetOpen,
  handleOpenBottomSheet,
  showListC,
}) => {
  //POST: 댓글
  const {authToken, BASE_URL} = useAuth();
  const {postPk, selectedIndex, emojiRender, setEmojiRender} = usePost();
  const handleEmojiSelect = (number) => {
    axios
      .post(
        `${BASE_URL}line/emo/w/${postPk}/`,
        {
          line_postsec: selectedIndex.index,
          sentence: selectedIndex.sentenceIndex,
          line_content: selectedIndex.sentence,
          content: number,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(
          selectedIndex.index,
          selectedIndex.sentenceIndex,
          selectedIndex.sentence
        );
        setEmojiRender(emojiRender + 1);
        closeEmojiBar();
        if (!isBottomSheetOpen) {
          handleOpenBottomSheet();
          showListC();
        }
        console.log(response);
      })
      .catch((error) => {
        console.error('감정표현을 등록하는 중 오류가 발생했습니다.', error);
      });
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
