import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//components
import CommentBox from './CommentBox';
//images
import submiticon from '../../images/submiticon.svg';
//context
import {useAuth} from '../../contexts/AuthContext';
import {usePost} from '../../contexts/PostContext';

const CommentsList = () => {
  const [render, setRender] = useState(1);

  // GET: 댓글
  const {authToken, BASE_URL} = useAuth();
  const {postPk, selectedIndex} = usePost();
  useEffect(() => {
    getComments();
  }, [render]);

  const [comments, setComments] = useState([]);
  const getComments = () => {
    axios
      .get(`${BASE_URL}post/${postPk}/contents/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const postData = response.data.data.PostSec;
        const targetSection = postData.find(
          (section) => section.num === selectedIndex.index
        );
        if (targetSection) {
          const targetLine = targetSection.Lines.find(
            (line) => line.sentence === selectedIndex.sentenceIndex
          );
          const targetComments = targetLine.LineCom;
          setComments(targetComments);
        }
        console.log(comments);
      })
      .catch((error) => {
        console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  //POST: 댓글
  const [comment, setComment] = useState('');
  const handleCommentSubmit = () => {
    if (comment.trim() === '') return null;
    axios
      .post(
        `${BASE_URL}line/com/w/${postPk}/`,
        {
          line_postsec: selectedIndex.index,
          sentence: selectedIndex.sentenceIndex,
          line_content: selectedIndex.sentence,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setRender(render + 1);
        setComment('');
        console.log(response);
      })
      .catch((error) => {
        console.error('댓글을 등록하는 중 오류가 발생했습니다.', error);
      });
  };

  //Delete: 댓글 삭제
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}line/com/del/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('한마디를 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <Container>
      <Num>댓글 {comments.length}개</Num>
      <List>
        {comments.map((comment) => (
          <CommentBox
            key={comment.linecom_id}
            commentId={comment.linecom_id}
            commentContent={comment.content}
            commentLike={comment.likenum}
            doLike={comment.do_like}
            author={comment.linecom_user.nickname}
            profile={comment.linecom_user.profile}
            handleDelete={handleDelete}
            replies={comment.LineComCom}
            render={render}
            setRender={setRender}
          ></CommentBox>
        ))}
      </List>
      <InputBoxPosition>
        <Inputbox
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='밑줄 친 문장을 읽고 드는 생각을 댓글로 공유해 보세요.'
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
  padding-left: 16px;

  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
