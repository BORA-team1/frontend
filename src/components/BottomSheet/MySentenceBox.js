import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

//context
import {useAuth} from '../../contexts/AuthContext';

const MySentenceBox = ({lineId, lineContent, render, setRender}) => {
  //Delete: 내 밑줄 삭제
  const {authToken, BASE_URL} = useAuth();
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}line/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('밑줄을 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <Container>
      <Sentence>“ {lineContent} ”</Sentence>
      <SelectButton>
        <span onClick={() => handleDelete(lineId)}>삭제</span>
      </SelectButton>
    </Container>
  );
};

export default MySentenceBox;

const Container = styled.div`
  width: 390px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--sub-background, #242237);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  border-bottom: 1px solid #353646;
`;

const Sentence = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  line-height: 133.5%; /* 20.025px */
  letter-spacing: -0.3px;
`;

const SelectButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;

  span {
    cursor: pointer;
  }
`;
