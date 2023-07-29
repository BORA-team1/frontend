import React from 'react';
import styled from 'styled-components';

const ArticleContents = () => {
  return (
    <Test>
      <div>test</div>
    </Test>
  );
};

export default ArticleContents;

const Test = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
