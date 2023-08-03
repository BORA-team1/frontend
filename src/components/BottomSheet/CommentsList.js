import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';

const CommentsList = () => {
  return (
    <Container>
      <Num>한마디 6개</Num>
      <List>
        <CommentBox></CommentBox>
      </List>
    </Container>
  );
};

export default CommentsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
