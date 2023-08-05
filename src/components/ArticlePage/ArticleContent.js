import React, {useState} from 'react';
import styled from 'styled-components';
import HighlightingBottomSheet from '../BottomSheet/HighlightingBottomSheet';
import FloatingBar from './FloatingBar';
import './Article.css';
import ContentPopup from './ContentPopup';

const ArticleContent = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [category, setCategory] = useState('A');
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const handleOpenBottomSheet = () => {
    setBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
    setExpanded(false);
  };

  const openEmojiBar = () => {
    setIsEmojiBarOpen(true);
  };
  const closeEmojiBar = () => {
    setIsEmojiBarOpen(false);
  };

  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');

  const highlightText = (event) => {
    const selectedText = window.getSelection().toString();

    if (selectedText) {
      setSelectedHighlight(selectedText);
    } else {
      setSelectedHighlight(null);
    }
  };

  const addToHighlights = () => {
    if (selectedHighlight) {
      // axios 추가하기
      setSelectedHighlight(null);
    }
  };

  return (
    <Wrapper>
      {/* map으로 섹션 띄우기 */}
      <Context>
        <p onClick={highlightText} className='highlight-text'>
          혹시 요즘 아스파탐 논란 보고 ‘제로슈거 음료 안 마시는 게 낫나?’ 고민한
          사람 있나요? 아스파탐 진짜 위험한 건지, 시원하게 하나씩 팩트체크
          해볼게요
        </p>
        <ContextBar></ContextBar>
      </Context>
      <ContentPopup></ContentPopup>
      <Context>
        <p onClick={highlightText} className='highlight-text'>
          혹시 요즘 아스파탐 논란 보고 ‘제로슈거 음료 안 마시는 게 낫나?’ 고민한
          사람 있나요? 아스파탐 진짜 위험한 건지, 시원하게 하나씩 팩트체크
          해볼게요
        </p>
        <ContextBar></ContextBar>
      </Context>
      <EditerFollow>이 포스트의 에디터 팔로우하기</EditerFollow>
      {selectedHighlight && (
        <FloatingBar
          addToHighlights={addToHighlights}
          isBottomSheetOpen={isBottomSheetOpen}
          handleOpenBottomSheet={handleOpenBottomSheet}
          showListA={showListA}
          showListB={showListB}
          showListC={showListC}
          isEmojiBarOpen={isEmojiBarOpen}
          openEmojiBar={openEmojiBar}
          closeEmojiBar={closeEmojiBar}
        ></FloatingBar>
      )}
      {isBottomSheetOpen && (
        <HighlightingBottomSheet
          onClose={handleCloseBottomSheet}
          expanded={expanded}
          setExpanded={setExpanded}
          category={category}
          showListA={showListA}
          showListB={showListB}
          showListC={showListC}
          openEmojiBar={openEmojiBar}
          closeEmojiBar={closeEmojiBar}
        ></HighlightingBottomSheet>
      )}
    </Wrapper>
  );
};

export default ArticleContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 37.4px;
  gap: 50px;

  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 169.336%;
`;

const Context = styled.div`
  display: flex;
  flex-direction: row;

  p {
    width: 330px;
    /* width: 345px; */
  }
`;

const ContextBar = styled.div`
  margin-left: 10px;
  width: 5px;
  height: auto;
  background-color: #2b2c3f;
  border-radius: 10px;
`;

const EditerFollow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 10px 35px;
  margin-top: 20px;
  margin-bottom: 40px;

  border-radius: 20px;
  background: #5a45f5;

  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
