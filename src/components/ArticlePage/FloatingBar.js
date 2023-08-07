import React from 'react';
import styled from 'styled-components';
import './FloatingBar.css';
import QnACreateModal from './QnACreateModal';
import EmojiBar from './EmojiBar';
import CommentInput from './CommentInput';

const FloatingBar = ({
  addToHighlights,
  isBottomSheetOpen,
  selectedSentence,
  handleOpenBottomSheet,
  showListA,
  showListB,
  showListC,
  isQnAOpen,
  openQnACreateModal,
  closeQnACreateModal,
  isInputOpen,
  openInputBox,
  closeInputBox,
  isEmojiBarOpen,
  openEmojiBar,
  closeEmojiBar,
}) => {
  return (
    <Wrapper>
      <Container>
        <div className='circle1' onClick={addToHighlights}></div>
        <div
          className='circle2'
          onClick={() => {
            openQnACreateModal(selectedSentence);
          }}
        ></div>
        <div
          className='circle3'
          onClick={() => {
            openInputBox(selectedSentence);
          }}
        ></div>
        <div
          className='circle4'
          onClick={() => {
            openEmojiBar(selectedSentence);
          }}
        ></div>
      </Container>
      {isQnAOpen && (
        <QnACreateModal
          closeQnACreateModal={closeQnACreateModal}
          handleOpenBottomSheet={handleOpenBottomSheet}
          showListB={showListB}
        ></QnACreateModal>
      )}
      {isInputOpen && (
        <CommentInput
          closeInputBox={closeInputBox}
          handleOpenBottomSheet={handleOpenBottomSheet}
          showListA={showListA}
        ></CommentInput>
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

// const InputWrapper = styled.div`
//   position: fixed;
//   z-index: 2;
//   top: 0;
//   width: 390px;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const InputBoxContainer = styled.div`
//   position: absolute;
//   top: 180px;
//   width: 390px;
//   padding: 21px 20px;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   background-color: #161524;
//   gap: 6px;

//   img {
//     width: 35px;
//     height: 35px;
//     cursor: pointer;
//   }
// `;

// const Inputbox = styled.input`
//   width: 309px;
//   height: 35px;
//   border-radius: 20px;
//   box-shadow: 0 0 0 1px #fff inset;
//   background-color: #161524;
//   padding-left: 10px;

//   color: rgba(255, 255, 255, 0.6);
//   font-family: 'Pretendard-Regular';
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;
// `;
