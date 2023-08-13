import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Difficulty from '../Common/Difficulty';
import articlebackground from '../../images/articlebackground.png';
import audioicon from '../../images/audioicon.png';

//context
import {useAuth} from '../../contexts/AuthContext';

const ArticleHeader = ({postPk}) => {
  const navigate = useNavigate();

  // GET: 세부포스트 헤더
  const {authToken, BASE_URL} = useAuth();
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState('');
  const getPosts = () => {
    axios
      .get(`${BASE_URL}post/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
        setDate(response.data.data.date);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(
          '세부포스트 헤더를 불러오는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  //작성 날짜 추출
  const inputDate = new Date(date);
  const year = inputDate.getFullYear().toString().slice(2); // 년도에서 뒤의 두 자리 추출
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 패딩
  const day = inputDate.getDate().toString().padStart(2, '0'); // 일자를 두 자리로 패딩
  const formattedDateString = `${year}.${month}.${day}`;

  //난이도
  let difficulty;
  if (posts.diff === 1) {
    difficulty = 'light';
  } else if (posts.diff === 2) {
    difficulty = 'medium';
  } else if (posts.diff === 3) {
    difficulty = 'heavy';
  }

  return (
    <Wrapper>
      <BackgroundImg>
        <img src={articlebackground} alt='포스트 배경 이미지'></img>
      </BackgroundImg>
      <GradientOverlay></GradientOverlay>
      <ButtonContainer>
        <AllContentsButton
          onClick={() => {
            navigate(`/article/${postPk}/allcontents`);
          }}
        >
          콘텐츠 모아보기
        </AllContentsButton>
        <AudioBookButton>
          <img
            onClick={() => {
              navigate(`/article/${postPk}/audio`);
            }}
            src={audioicon}
            alt='오디오 북 아이콘'
          ></img>
        </AudioBookButton>
      </ButtonContainer>
      <TitleContainer>
        <ArticleTitleTop>
          <ArticleTag>
            {posts.hashtag &&
              posts.hashtag.map((tag, index) => (
                <TagItem key={index}>#{tag.hashtag}</TagItem>
              ))}
          </ArticleTag>
          <Difficulty size='medium' difficulty={difficulty}>
            {difficulty}
          </Difficulty>
        </ArticleTitleTop>
        <ArticleTitleText>{posts.title}</ArticleTitleText>
        <ArticleTitleBottom>
          <div>by. {posts.author}</div>
          <div>{formattedDateString}</div>
        </ArticleTitleBottom>
      </TitleContainer>
    </Wrapper>
  );
};

export default ArticleHeader;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 360px;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  color: #fff;
`;

const BackgroundImg = styled.div`
  top: 0;
  width: 390px;
  height: 360px;
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 390px;
  height: 360px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
`;

const ButtonContainer = styled.div`
  z-index: 1;
  width: 350px;
  margin-top: 73px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AllContentsButton = styled.div`
  padding: 7px 14px;
  height: fit-content;

  border-radius: 20px;
  border: 1.2px solid #fff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

const AudioBookButton = styled.div`
  width: 39px;
  height: 39px;
  background: #5a45f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    width: 23px;
    height: 23px;
  }
`;

const TitleContainer = styled.div`
  z-index: 1;
  width: 310px;
  padding: 20px;
  margin-top: 109px;
  margin-left: 20px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  line-height: 136.5%;
`;

const ArticleTitleTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArticleTag = styled.ul`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.32px;
  list-style: none;
  padding: 0;
`;

const TagItem = styled.li`
  display: inline-block;
  margin-right: 5px;
  &:not(:last-child)::after {
    content: ' • ';
    margin: 0 5px;
  }
`;

const ArticleTitleText = styled.div`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.48px;
`;
const ArticleTitleBottom = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.26px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
