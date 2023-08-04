import React from 'react';
import styled, {keyframes} from 'styled-components';
import Review from '../ArticlePage/Review';
import InputBox from '../InputBox';

const ReviewsBottomSheet = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    <BottomSheetOverlay onClick={onClose}>
      <BottomSheetContainer
        isOpen={isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={onClose}>닫기</CloseBottomSheet>
            <span>한마디</span>
          </HeaderText>
          <HR></HR>
        </BottomSheetHeader>

        <ReviewContatiner>
          <ReviewsTop>한마디 6개</ReviewsTop>
          <List>
            <Review></Review>
          </List>
        </ReviewContatiner>
        <InputBoxPosition>
          <InputBox></InputBox>
        </InputBoxPosition>
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default ReviewsBottomSheet;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const BottomSheetOverlay = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 100%;
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

  animation: ${({isOpen}) => (isOpen ? slideUp : slideDown)} 0.3s ease-in-out;
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
  margin-right: 129px;
  cursor: pointer;
`;

const ReviewContatiner = styled.div`
  margin-top: 75px;
  margin-bottom: 77px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const ReviewsTop = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const List = styled.div`
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;

const InputBoxPosition = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
  border-top: 1px solid #353646;
  position: absolute;
  bottom: 0;
`;
