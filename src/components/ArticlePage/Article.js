import React, {useState} from 'react';
import styled from 'styled-components';
import HighlightingBottomSheet from '../BottomSheet/HighlightingBottomSheet';
import Difficulty from '../Difficulty';
import FloatingBar from './FloatingBar';
import articlebackground from '../../images/articlebackground.png';
import './Article.css';
import EmojiBar from './EmojiBar';
import ContentPopup from './ContentPopup';

const Article = () => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <>
      <ArticleTitle>
        <img src={articlebackground} alt='포스트 배경 이미지'></img>
        <GradientOverlay></GradientOverlay>
        <ArticleContentsZip>콘텐츠 모아보기</ArticleContentsZip>
        <TitleContainer>
          <ArticleTitleTop>
            {/* 해시태그 나중에 수정 */}
            <ArticleTag>#라이프 · #건강</ArticleTag>
            <Difficulty size='medium' difficulty='light'>
              light
            </Difficulty>
          </ArticleTitleTop>
          <ArticleTitleText>제로 슈거와 아스파탐의 죄수?!</ArticleTitleText>
          <ArticleTitleBottom>
            <div>by. 헬시라이프</div>
            <div>23.07.07</div>
          </ArticleTitleBottom>
        </TitleContainer>
      </ArticleTitle>
      <ArticleContent>
        {/* map으로 섹션 띄우기 */}
        <Context>
          <p onClick={highlightText} className='highlight-text'>
            혹시 요즘 아스파탐 논란 보고 ‘제로슈거 음료 안 마시는 게 낫나?’
            고민한 사람 있나요? 아스파탐 진짜 위험한 건지, 시원하게 하나씩
            팩트체크 해볼게요
          </p>
          <ContextBar></ContextBar>
        </Context>
        <ContentPopup></ContentPopup>
        <Context>
          <p onClick={highlightText} className='highlight-text'>
            혹시 요즘 아스파탐 논란 보고 ‘제로슈거 음료 안 마시는 게 낫나?’
            고민한 사람 있나요? 아스파탐 진짜 위험한 건지, 시원하게 하나씩
            팩트체크 해볼게요
          </p>
          <ContextBar></ContextBar>
        </Context>
        <EditerFollow>이 포스트의 에디터 팔로우하기</EditerFollow>
      </ArticleContent>
      {selectedHighlight && (
        <FloatingBar
          addToHighlights={addToHighlights}
          handleOpenBottomSheet={handleOpenBottomSheet}
          openEmojiBar={openEmojiBar}
        ></FloatingBar>
      )}
      {isBottomSheetOpen && (
        <HighlightingBottomSheet
          onClose={handleCloseBottomSheet}
          isEmojiBarOpen={isEmojiBarOpen}
          openEmojiBar={openEmojiBar}
          closeEmojiBar={closeEmojiBar}
          expanded={expanded}
          setExpanded={setExpanded}
        ></HighlightingBottomSheet>
      )}
      {isEmojiBarOpen && <EmojiBar closeEmojiBar={closeEmojiBar}></EmojiBar>}
    </>
  );
};

export default Article;

const ArticleTitle = styled.div`
  width: 390px;
  height: 360px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.57) 33.39%,
      rgba(0, 0, 0, 0.42) 55.61%,
      rgba(0, 0, 0, 0.27) 77.52%,
      rgba(0, 0, 0, 0) 100%
    ),
    lightgray 50% / cover no-repeat;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: 360px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
`;

const ArticleContentsZip = styled.div`
  position: absolute;
  top: 73px;
  left: 20px;
  padding: 7px 14px;

  border-radius: 20px;
  border: 1.2px solid #fff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

  color: #fff;
  text-align: center;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 213px;
  left: 20px;
  width: 310px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  color: white;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  line-height: 136.5%;
`;

const ArticleTitleTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArticleTag = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.32px;
`;

const ArticleTitleText = styled.div`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.48px;
`;
const ArticleTitleBottom = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.26px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 37.4px;

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
  gap: 10px;

  p {
    width: 330px;
  }
`;

const ContextBar = styled.div`
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
  margin-top: 70px;
  margin-bottom: 40px;

  border-radius: 20px;
  background: var(--main-purple, #5a45f5);

  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
