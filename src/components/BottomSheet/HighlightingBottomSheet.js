import React from 'react';
import styled, {keyframes} from 'styled-components';
import CommentsList from './CommentsList';
import QnAList from './QnAList';
import EmojiList from './EmojiList';
import InputBox from '../InputBox';

const HighlightingBottomSheet = ({
  onClose,
  expanded,
  setExpanded,
  category,
  showListA,
  showListB,
  showListC,
  openEmojiBar,
}) => {
  const openExpandSpace = () => {
    setExpanded(true);
  };

  const barPosition = {
    A: '0',
    B: '130px',
    C: '260px',
  };

  return (
    <BottomSheetOverlay onClick={onClose}>
      <BottomSheetContainer
        onClick={(e) => e.stopPropagation()}
        expanded={expanded}
      >
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet
              onClick={() => {
                onClose();
              }}
            >
              닫기
            </CloseBottomSheet>
            <Sentense>"문장"</Sentense>
          </HeaderText>
          <HR></HR>
          <Category>
            <div>
              <span
                onClick={showListA}
                className={category === 'A' ? 'active' : ''}
              >
                댓글
              </span>
            </div>
            <div>
              <span
                onClick={showListB}
                className={category === 'B' ? 'active' : ''}
              >
                Q&A
              </span>
            </div>
            <div>
              <span
                onClick={showListC}
                className={category === 'C' ? 'active' : ''}
              >
                감정표현
              </span>
            </div>
          </Category>
          <Bar style={{left: barPosition[category]}} />
        </BottomSheetHeader>

        {category === 'A' && (
          <ExpandSpace onClick={openExpandSpace}>
            <CommentsList></CommentsList>
          </ExpandSpace>
        )}
        {category === 'B' && (
          <ExpandSpace onClick={openExpandSpace}>
            <QnAList expanded={expanded}></QnAList>
          </ExpandSpace>
        )}
        {category === 'C' && (
          <EmojiListContainer>
            <EmojiList openEmojiBar={openEmojiBar}></EmojiList>
          </EmojiListContainer>
        )}

        {category !== 'C' && (
          <InputBoxPosition>
            <InputBox></InputBox>
          </InputBoxPosition>
        )}
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default HighlightingBottomSheet;

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
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BottomSheetContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.expanded ? '780px' : '532px')};
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;

  background: var(--background, #161524);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 0px 20px;
`;

const CloseBottomSheet = styled.div`
  width: 26px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  cursor: pointer;
`;

const Sentense = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  text-align: center;
  color: #fff;
  font-weight: 400;
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

  div > span.active {
    color: white;
  }
`;

const Bar = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 130px;
  background-color: white;
  transition: left 0.3s ease;
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

const ExpandSpace = styled.div`
  margin-top: 192px;
  margin-bottom: 90px;
`;

const EmojiListContainer = styled.div`
  margin-top: 192px;
  width: 390px;
  padding: 20px;
  box-sizing: border-box;
`;