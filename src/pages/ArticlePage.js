import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {SheetContext} from '../contexts/SheetContext';
import styled from 'styled-components';

import StatusBar from '../components/ArticlePage/StatusBar';
import ArticleHeader from '../components/ArticlePage/ArticleHeader';
import ArticleContent from '../components/ArticlePage/ArticleContent';
import ArticleReview from '../components/ArticlePage/ArticleReview';
import BottomBar from '../components/ArticlePage/BottomBar';

import ReviewsBottomSheet from '../components/BottomSheet/ReviewsBottomSheet';
import VoteBottomSheet from '../components/BottomSheet/VoteBottomSheet';
import SentencesBottomSheet from '../components/BottomSheet/SentencesBottomSheet';
import DebateBottomSheet from '../components/BottomSheet/DebateBottomSheet';

const ArticlePage = () => {
  //post_id
  const {post_id} = useParams();

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
      <SentencesBottomSheet
        handleCloseBottomSheet={handleCloseBottomSheet}
        postPk={post_id}
      />
    ),
    review: (
      <ReviewsBottomSheet
        handleCloseBottomSheet={handleCloseBottomSheet}
        postPk={post_id}
      />
    ),
    vote: (
      <VoteBottomSheet
        handleCloseBottomSheet={handleCloseBottomSheet}
        postPk={post_id}
      />
    ),
    debate: (
      <DebateBottomSheet
        handleCloseBottomSheet={handleCloseBottomSheet}
        postPk={post_id}
      />
    ),
  };

  return (
    <SheetContext.Provider value={bottomSheetOpen}>
      <Wrapper>
        <StatusBar></StatusBar>
        <ArticleHeader postPk={post_id}></ArticleHeader>
        <ArticleContent
          isContentsOn={isContentsOn}
          postPk={post_id}
        ></ArticleContent>
        <ArticleReview
          handleBottomSheet={handleBottomSheet}
          postPk={post_id}
        ></ArticleReview>
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
