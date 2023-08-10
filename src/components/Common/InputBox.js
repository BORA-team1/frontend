import React, { useState } from "react";
import styled from "styled-components";
import submiticon from "../../images/submiticon.svg";

const InputBox = ({ onInputChange }) => {
  //토론페이지에서 사용될 때 필요한 코드 시작
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onInputChange(inputValue);
    setInputValue("");
  };
  //토론페이지에서 사용될 때 필요한 코드 끝
  return (
    <InputBoxContainer>
      <Inputbox value={inputValue} onChange={handleInputChange} />
      <img src={submiticon} alt="submiticon" onClick={handleSubmit}></img>
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
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
