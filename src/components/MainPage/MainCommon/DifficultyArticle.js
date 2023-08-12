import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//임시 Data
import {postCover} from '../../../data/_mock/articledata';

import DifficultyBox from './DifficultyBox';

const DifficultyArticle = ({selectDifficulty}) => {
  const BASE_URL = 'http://localhost:3001';
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
        console.error('글 목록을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  //이미지 각각 받아오기
  // const imageArrayL = postCover[1] || [];
  // const imageArrayM = postCover[2] || [];
  // const imageArrayH = postCover[3] || [];
  return (
    <>
      {posts &&
        selectDifficulty === 1 &&
        posts.PostLight?.map((article) => (
          <DifficultyBox key={article.post_id} article={article} />
        ))}
      {posts &&
        selectDifficulty === 2 &&
        posts.PostMed?.map((article) => (
          <DifficultyBox key={article.post_id} article={article} />
        ))}
      {posts &&
        selectDifficulty === 3 &&
        posts.PostHeavy?.map((article) => (
          <DifficultyBox key={article.post_id} article={article} />
        ))}
    </>
  );
};

export default DifficultyArticle;

const Box = styled.div`
  display: flex;
  flex-direction: flex-start;
  padding: 10px 0px;

  height: 80px;
`;

const ArticleImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  margin: 7px 10px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag = styled.div`
  color: var(--main-purple, #5a45f5);
  font-family: 'Pretendard-Regular';
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
`;

const Title = styled.div`
  width: 170px;
  height: 33px;

  margin: 5px 0px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
`;

const ArticleAuthor = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Pretendard-Regular';
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
`;

const IconBox = styled.div`
  position: relative;
`;

const VoteIcon = styled.img`
  position: absolute;
  z-index: 30;

  margin: 20px 45px 20px 0px;
`;

const DebateIcon = styled.img`
  position: absolute;
  z-index: 20;

  margin: 20px 22px 20px 23px;
`;

const QnAIcon = styled.img`
  position: absolute;
  z-index: 10;

  margin: 20px 0px 20px 45px;
`;
