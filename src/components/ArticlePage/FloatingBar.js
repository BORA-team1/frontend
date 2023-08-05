import React, {useState} from 'react';
import styled from 'styled-components';
import './FloatingBar.css';
import QnACreateModal from './QnACreateModal';
import EmojiBar from './EmojiBar';

const FloatingBar = ({
  addToHighlights,
  isBottomSheetOpen,
  handleOpenBottomSheet,
  showListA,
  showListB,
  showListC,
  isEmojiBarOpen,
  openEmojiBar,
  closeEmojiBar,
}) => {
  const [isQnAOpen, setIsQnAOpen] = useState(false);

  const openQnACreateModal = () => {
    setIsQnAOpen(true);
  };
  const closeQnACreateModal = () => {
    setIsQnAOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        <div className='circle1' onClick={addToHighlights}></div>
        <div className='circle2' onClick={openQnACreateModal}></div>
        <div
          className='circle3'
          onClick={() => {
            handleOpenBottomSheet();
            showListA();
          }}
        ></div>
        <div className='circle4' onClick={openEmojiBar}></div>
      </Container>
      {isQnAOpen && (
        <QnACreateModal
          closeQnACreateModal={closeQnACreateModal}
          handleOpenBottomSheet={handleOpenBottomSheet}
          showListB={showListB}
        ></QnACreateModal>
      )}
      {isEmojiBarOpen && (
        <EmojiBar
          closeEmojiBar={closeEmojiBar}
          isBottomSheetOpen={isBottomSheetOpen}
          handleOpenBottomSheet={handleOpenBottomSheet}
          showListC={showListC}
        ></EmojiBar>
      )}
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
