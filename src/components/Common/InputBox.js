import React from 'react';
import styled from 'styled-components';
import submiticon from '../../images/submiticon.svg';

const InputBox = () => {
  return (
    <InputBoxContainer>
      <Inputbox></Inputbox>
      <img src={submiticon} alt='submiticon'></img>
    </InputBoxContainer>
  );
};

export default InputBox;

const InputBoxContainer = styled.div`
  width: 350px;
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
