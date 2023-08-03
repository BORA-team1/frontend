import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import SentenceBox from './SentenceBox';
import CommentBox from './CommentBox';
import CommentsList from './CommentsList';

const SentencesBottomSheet = ({isOpen, onClose}) => {
  const [category, setCategory] = useState('A');

  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');
  const showListD = () => setCategory('D');
  // if (!isOpen) return null;

  return (
    <BottomSheetOverlay onClick={onClose}>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={onClose}>닫기</CloseBottomSheet>
            <span>밑줄모음</span>
          </HeaderText>
          <HR></HR>
          <Category>
            <div>
              <span onClick={showListA}>밑줄</span>
            </div>
            <div>
              <span onClick={showListB}>댓글</span>
            </div>
            <div>
              <span onClick={showListC}>Q&A</span>
            </div>
            <div>
              <span onClick={showListD}>감정표현</span>
            </div>
          </Category>
        </BottomSheetHeader>

        {/* 카테고리에 맞는 리스트가 뜨게끔 추후에 수정할 예정 */}
        <SentencesList>
          <Num>문장 1개</Num>
          <SentenceBox></SentenceBox>
          <CommentBoxContainer>
            <CommentBox></CommentBox>
          </CommentBoxContainer>
        </SentencesList>
        <CommentsList></CommentsList>
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default SentencesBottomSheet;

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheetOverlay = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 844px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BottomSheetContainer = styled.div`
  width: 100%;
  height: 780px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;
  font-family: 'Pretendard-Regular';
  font-style: normal;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-size: 15px;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;

  background: var(--background, #161524);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;

  span {
    color: #fff;
    font-weight: 600;
  }
`;

const CloseBottomSheet = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-right: 125px;
  cursor: pointer;
`;

const Category = styled.div`
  width: 390px;
  height: 47px;
  display: flex;
  flex-direction: row;

  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.28px;
  color: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-bottom: 1px solid rgba(53, 54, 70, 0.3);

  div {
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div > span {
    cursor: pointer;
  }
`;

const SentencesList = styled.div`
  margin-top: 125px;
  margin-bottom: 77px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const Num = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const CommentBoxContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid #353646;
  background: #1e1c2e;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;
