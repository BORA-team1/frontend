import React from 'react';
import styled from 'styled-components';
import Article from './ArticlePage/Article';
import ArticleReview from './ArticlePage/ArticleReview';
import InputBox from './InputBox';
import StatusBar from './ArticlePage/StatusBar';

const ArticlePage = () => {
  return (
    <Wrapper>
      <StatusBar></StatusBar>
      <Article></Article>
      <ArticleReview></ArticleReview>
      <InputBoxPosition>
        <InputBox></InputBox>
      </InputBoxPosition>
    </Wrapper>
  );
};

export default ArticlePage;

const Wrapper = styled.div`
  padding-bottom: 50px;
`;

const InputBoxPosition = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
`;
