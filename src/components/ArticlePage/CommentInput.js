import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import submiticon from '../../images/submiticon.svg';

//context
import {useAuth} from '../../contexts/AuthContext';
import {usePost} from '../../contexts/PostContext';

const CommentInput = ({
  closeInputBox,
  handleOpenBottomSheet,
  showListA,
  render,
  setRender,
}) => {
  //플로팅 바에서 import된 컴포넌트

  //POST: 댓글
  const {authToken, BASE_URL} = useAuth();
  const {postPk, selectedIndex} = usePost();

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
        setComment('');
        closeInputBox();
        handleOpenBottomSheet();
        showListA();
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('댓글을 등록하는 중 오류가 발생했습니다.', error);
      });
  };
  return (
    <Wrapper onClick={closeInputBox}>
      <InputBoxContainer onClick={(e) => e.stopPropagation()}>
        <Inputbox
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='밑줄 친 문장을 읽고 드는 생각을 댓글로 공유해 보세요.'
        ></Inputbox>
        <img
          onClick={() => {
            handleCommentSubmit();
          }}
          src={submiticon}
          alt='submiticon'
        ></img>
      </InputBoxContainer>
    </Wrapper>
  );
};

export default CommentInput;

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const InputBoxContainer = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
  border-top: 1px solid #353646;
  position: absolute;
  bottom: 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
