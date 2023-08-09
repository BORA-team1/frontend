import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//components
import TopBar from "../components/Common/TopBar";
import DifficultyArticle from "../components/MainPage/MainCommon/DifficultyArticle";

//images
import X from "../images/X.svg";

const EntirePage = () => {
  const BASE_URL = "http://localhost:3002";
  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/main`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("글 목록을 불러오는 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <Container>
      <Scroll>
        <TopBar />
        <>
          <DifficultyArticleList>
            <DifficultyArticle selectDifficulty={1} />
            <DifficultyArticle selectDifficulty={2} />
            <DifficultyArticle selectDifficulty={3} />
          </DifficultyArticleList>
        </>
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
