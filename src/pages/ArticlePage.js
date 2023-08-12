import React, {useState} from 'react';
import {SheetContext} from '../contexts/SheetContext';
import styled from 'styled-components';

import StatusBar from '../components/ArticlePage/StatusBar';
import ArticleHeader from '../components/ArticlePage/ArticleHeader.';
import ArticleContent from '../components/ArticlePage/ArticleContent';
import ArticleReview from '../components/ArticlePage/ArticleReview';
import BottomBar from '../components/ArticlePage/BottomBar';

import ReviewsBottomSheet from '../components/BottomSheet/ReviewsBottomSheet';
import VoteBottomSheet from '../components/BottomSheet/VoteBottomSheet';
import SentencesBottomSheet from '../components/BottomSheet/SentencesBottomSheet';
import DebateBottomSheet from '../components/BottomSheet/DebateBottomSheet';

const ArticlePage = () => {
  //콘텐츠 켜짐/꺼짐
  const [isContentsOn, setContentsOn] = useState(true);
  const handleContentsOn = () => {
    setContentsOn(!isContentsOn);
  };

  //바텀시트 관리
  const [bottomSheetOpen, setBottomSheetOpen] = useState(null);

  const handleBottomSheet = (e) => {
    setBottomSheetOpen(e.target.id);
  };
  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(null);
  };
  const selectBottomSheet = {
    sentences: (
      <SentencesBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />
    ),
    review: (
      <ReviewsBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />
    ),
    vote: <VoteBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />,
    debate: (
      <DebateBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />
    ),
  };

  return (
    <SheetContext.Provider value={bottomSheetOpen}>
      <Wrapper>
        <StatusBar></StatusBar>
        <ArticleHeader></ArticleHeader>
        <ArticleContent isContentsOn={isContentsOn}></ArticleContent>
        <ArticleReview handleBottomSheet={handleBottomSheet}></ArticleReview>
        <BottomBar
          isContentsOn={isContentsOn}
          handleContentsOn={handleContentsOn}
          handleBottomSheet={handleBottomSheet}
        ></BottomBar>
        {bottomSheetOpen && <div>{selectBottomSheet[bottomSheetOpen]}</div>}
      </Wrapper>
    </SheetContext.Provider>
  );
};

export default ArticlePage;

const Wrapper = styled.div`
  background: #161524;
  margin: 0px auto;
  width: 390px;
  height: 100%;
  min-height: 844px;
`;
