import React from 'react';
import styled from 'styled-components';
import submiticon from '../../images/submiticon.svg';

const CommentInput = ({closeInputBox, handleOpenBottomSheet, showListA}) => {
  //댓글 저장하는 로직 추가하기

  return (
    <Wrapper onClick={closeInputBox}>
      <InputBoxContainer onClick={(e) => e.stopPropagation()}>
        <Inputbox></Inputbox>
        <img
          onClick={() => {
            closeInputBox();
            handleOpenBottomSheet();
            showListA();
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

  color: rgba(255, 255, 255, 0.6);
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
