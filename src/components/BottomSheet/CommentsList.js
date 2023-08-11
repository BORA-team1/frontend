import React, {useState} from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import submiticon from '../../images/submiticon.svg';

const CommentsList = () => {
  // const loadComments = () => {
  //   axios
  //     .get(`URL`)
  //     .then((response) => {
  //       setComments (response.data);
  //     })
  //     .catch((error) => {
  //       console.error('get Error: 질문', error);
  //     });
  // };

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
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

  //댓글 저장
  const handleCommentSubmit = () => {
    if (comment.trim() === '') return null;
    const newComment = {
      id: comments.length + 1,
      content: comment,
      author: 'zimmmni',
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  //댓글 삭제
  const handleCommentDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  //답글 등록
  const addReply = (reviewId, replyText) => {
    const updatedComments = comments.map((review) => {
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
    setComments(updatedComments);
  };

  //언급할 사용자 설정
  const [mentionedUser, setMentionedUser] = useState('');
  const setMention = (author) => {
    setMentionedUser(author);
  };

  return (
    <Container>
      <Num>댓글 {comments.length}개</Num>
      <List>
        {comments.map((comment) => (
          <CommentBox
            key={comment.id}
            commentContent={comment.content}
            commentId={comment.id}
            author={comment.author}
            replies={comment.replies}
            handleCommentDelete={handleCommentDelete}
            addReply={addReply}
            setMention={setMention}
          ></CommentBox>
        ))}
      </List>
      <InputBoxPosition>
        <Inputbox
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Inputbox>
        <img
          onClick={handleCommentSubmit}
          src={submiticon}
          alt='submiticon'
        ></img>
      </InputBoxPosition>
    </Container>
  );
};

export default CommentsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 192px;
  margin-bottom: 90px;
`;

const Num = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 133.5%; /* 16.02px */
  letter-spacing: -0.24px;
`;

const List = styled.div`
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
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
