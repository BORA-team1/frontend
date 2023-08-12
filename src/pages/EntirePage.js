import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//components
import TopBar from '../components/Common/TopBar';
import DifficultyBox from '../components/MainPage/MainCommon/DifficultyBox';

//images
import X from '../images/X.svg';

const EntirePage = () => {
  const BASE_URL = 'https://juliaheo.pythonanywhere.com/';
  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}post/lists`)
      .then((response) => {
        setPosts(response.data.data.Post);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('글 목록을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <Container>
      <Scroll>
        <TopBar />
        <DifficultyArticleList>
          {posts &&
            posts.map((article, index) => (
              <DifficultyBox key={index} article={article} />
            ))}
        </DifficultyArticleList>
      </Scroll>
    </Container>
  );
};

export default EntirePage;

//전체 styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  max-width: 390px;
  max-height: 844px;
  margin: 0px auto;

  background-color: #161524;
  color: #fff;
`;

const Scroll = styled.div`
  overflow-y: scroll;
  height: 730px;

  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  z-index: 0;
`;

const DifficultyArticleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0px 20px;
`;
