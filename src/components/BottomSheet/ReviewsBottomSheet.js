import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import styled, {keyframes} from 'styled-components';
import Review from '../ArticlePage/Review';
import submiticon from '../../images/submiticon.svg';

const ReviewsBottomSheet = ({handleCloseBottomSheet}) => {
  // const BASE_URL = 'http://localhost:3001';
  // const [render, setRender] = useState(0);

  // 페이지 로드 시 저장된 댓글 목록을 불러옵니다.
  // useEffect(() => {
  //   loadReviews();
  // }, [render]);

  // const [hanData, setHanData] = useState(null);
  // const loadReviews = () => {
  //   axios
  //     .get(`${BASE_URL}/data`)
  //     .then((response) => {
  //       const hanContent = response.data.Han;
  //       setHanData(hanContent);
  //     })
  //     .catch((error) => {
  //       console.error('댓글 목록을 불러오는 중 오류가 발생했습니다.', error);
  //     });
  // };

  //한마디 등록
  // const [review, setReview] = useState('');
  // const [reviews, setReviews] = useState([]);

  // const handleReviewsSubmit = (event) => {
  //   event.preventDefault();
  //   if (review.trim() === '') return null;
  //   axios
  //     .post(`${BASE_URL}/data`, {content: review})
  //     .then((response) => {
  //       setRender(render + 1);
  //       const newReview = response.data.Han.content;
  //       setReviews([...reviews, newReview]);
  //       setReview('');
  //       console.log(reviews);
  //     })
  //     .catch((error) => {
  //       console.error('한마디 저장 중 오류가 발생했습니다.', error);
  //     });
  // };

  //한마디 삭제
  // const handleDelete = (id) => {
  //   const updatedReviews = reviews.filter((review) => review.id !== id);
  //   setReviews(updatedReviews);
  // };

  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 0,
      content: '첫 번째 댓글입니다.',
      author: '사용자 A',
      replies: [
        {id: 1, content: '대댓글 1', author: '사용자 C', mention: '사용자 A'},
        {id: 2, content: '대댓글 2', author: '사용자 D', mention: '사용자 A'},
      ],
    },
    {id: 1, content: '두 번째 댓글입니다.', author: '사용자 B', replies: []},
  ]);

  //한마디 등록
  const handleReviewsSubmit = () => {
    if (review.trim() === '') return null;
    const newReview = {
      id: reviews.length + 1,
      content: review,
      author: 'zimmmni',
    };
    setReviews([...reviews, newReview]);
    setReview('');
    console.log(reviews);
  };

  //한마디 삭제
  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  //답글 등록
  const addReply = (reviewId, replyText) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        const newReply = {
          content: replyText,
          author: 'zimmmni', // 현재 로그인한 사용자 닉네임 넣기
          mention: mentionedUser,
          id: Date.now(), //아이디 다르게 주려고 임시로 넣어둠
        };

        const updatedReplies = review.replies
          ? [...review.replies, newReply]
          : [newReply];

        return {
          ...review,
          replies: updatedReplies,
        };
      }
      return review;
    });
    setReviews(updatedReviews);
  };

  //언급할 사용자 설정
  const [mentionedUser, setMentionedUser] = useState('');
  const setMention = (author) => {
    setMentionedUser(author);
  };

  return (
    <BottomSheetOverlay>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={handleCloseBottomSheet}>
              닫기
            </CloseBottomSheet>
            <span>한마디</span>
          </HeaderText>
          <HR></HR>
        </BottomSheetHeader>

        <ReviewContatiner>
          <ReviewsTop>
            {reviews && reviews.length > 0 ? (
              <div>한마디 {reviews.length}개</div>
            ) : (
              <div>한마디가 없습니다.</div>
            )}
          </ReviewsTop>
          <List>
            {reviews.map((review) => (
              <Review
                key={review.id}
                replies={review.replies}
                reviewContent={review.content}
                reviewId={review.id}
                author={review.author}
                handleDelete={handleDelete}
                addReply={addReply}
                setMention={setMention}
              ></Review>
            ))}
          </List>
        </ReviewContatiner>
        <InputBoxPosition>
          <Inputbox
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></Inputbox>
          <img
            onClick={handleReviewsSubmit}
            src={submiticon}
            alt='submiticon'
          ></img>
        </InputBoxPosition>
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default ReviewsBottomSheet;

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #161524;
  gap: 6px;

  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const Inputbox = styled.input`
  width: 309px;
  height: 35px;
  border-radius: 20px;
  box-shadow: 0 0 0 1px #fff inset;
  background-color: #161524;
  padding-left: 10px;

  color: rgba(255, 255, 255, 0.6);
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
