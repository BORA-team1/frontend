import React, {useState} from 'react';
import styled from 'styled-components';
import more from '../../images/more.svg';
import Review from './Review';
import ReviewsBottomSheet from '../BottomSheet/ReviewsBottomSheet';
import BottomBar from './BottomBar';

const ArticleReview = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  return (
    <>
      <ArticleReviewContainer>
        <HR></HR>
        <ReviewTop>
          <div>한마디 6개</div>
          <MoreReview onClick={handleOpenBottomSheet}>
            다른 한마디 더보기<img src={more} alt='morereview'></img>
          </MoreReview>
        </ReviewTop>
        <ReviewContainer>
          <Review></Review>
        </ReviewContainer>
        <HR></HR>
      </ArticleReviewContainer>
      <ReviewsBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      ></ReviewsBottomSheet>

      <BottomBar handleOpenBottomSheet={handleOpenBottomSheet}></BottomBar>
    </>
  );
};

export default ArticleReview;

const ArticleReviewContainer = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const HR = styled.div`
  width: 390px;
  height: 8px;
  background: #12111c;
`;

const ReviewTop = styled.div`
  width: 350px;
  margin: 15px 20px 15px 20px;
  display: flex;
  justify-content: space-between;

  color: rgba(255, 255, 255, 0.6);
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  img {
    margin-left: 5px;
  }
`;

const MoreReview = styled.div`
  cursor: pointer;
  display: flex;
`;

const ReviewContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 15px;
`;
