import React, {useState} from 'react';
// import {SheetContext} from '../contexts/SheetContext';
import styled from 'styled-components';

import StatusBar from '../components/ArticlePage/StatusBar';
import ArticleHeader from '../components/ArticlePage/ArticleHeader.';
import ArticleContent from '../components/ArticlePage/ArticleContent';
import ArticleReview from '../components/ArticlePage/ArticleReview';
import BottomBar from '../components/ArticlePage/BottomBar';

import ReviewsBottomSheet from '../components/BottomSheet/ReviewsBottomSheet';
import VoteBottomSheet from '../components/BottomSheet/VoteBottomSheet';
import SentencesBottomSheet from '../components/BottomSheet/SentencesBottomSheet';

const ArticlePage = () => {
  const [isContentson, setContentson] = useState('true');

  //콘텐츠 켜짐/꺼짐
  const handleContentsOn = () => {
    setContentson(!isContentson);
    console.log(isContentson);
  };

  const [bottomSheetOpen, setBottomSheetOpen] = useState(null);

  const handleBottomSheet = (e) => {
    setBottomSheetOpen(e.target.id);
    console.log(e.target.id);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(null);
  };

  const selectBottomSheet = {
    review: (
      <ReviewsBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />
    ),
    vote: <VoteBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />,
    sentences: (
      <SentencesBottomSheet handleCloseBottomSheet={handleCloseBottomSheet} />
    ),
  };

  return (
    // <SheetContext.Provider value={handleBottomSheet}>
    <Wrapper>
      <StatusBar></StatusBar>
      <ArticleHeader></ArticleHeader>
      <ArticleContent isContentson={isContentson}></ArticleContent>
      <ArticleReview handleBottomSheet={handleBottomSheet}></ArticleReview>
      <BottomBar
        isContentson={isContentson}
        handleContentsOn={handleContentsOn}
        handleBottomSheet={handleBottomSheet}
      ></BottomBar>
      {bottomSheetOpen && <div>{selectBottomSheet[bottomSheetOpen]}</div>}
    </Wrapper>
    // </SheetContext.Provider>
  );
};

export default ArticlePage;

const Wrapper = styled.div`
  background: #161524;
  margin: 0px;
  width: 390px;
  height: 100%;
`;
