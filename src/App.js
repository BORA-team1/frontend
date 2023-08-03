import ArticlePage from './components/ArticlePage';
import styled from 'styled-components';
import './App.css';

function App() {
  return (
    <Wrapper>
      <Container>
        <ArticlePage></ArticlePage>
      </Container>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  background: var(--background, #161524);
  margin: 0px;
  width: 390px;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
