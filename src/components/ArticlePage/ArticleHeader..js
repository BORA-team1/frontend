import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Difficulty from '../Common/Difficulty';
import articlebackground from '../../images/articlebackground.png';
import audioicon from '../../images/audioicon.png';
import './Article.css';

const ArticleHeader = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BackgroundImg>
        <img src={articlebackground} alt='포스트 배경 이미지'></img>
      </BackgroundImg>
      <GradientOverlay></GradientOverlay>
      <ButtonContainer>
        <AllContentsButton
          onClick={() => {
            navigate('/article/allcontents');
          }}
        >
          콘텐츠 모아보기
        </AllContentsButton>
        <AudioBookButton>
          <img src={audioicon}></img>
        </AudioBookButton>
      </ButtonContainer>
      <TitleContainer>
        <ArticleTitleTop>
          {/* 해시태그 나중에 수정 */}
          <ArticleTag>#라이프 · #건강</ArticleTag>
          <Difficulty size='medium' difficulty='light'>
            light
          </Difficulty>
        </ArticleTitleTop>
        <ArticleTitleText>제로 슈거와 아스파탐의 죄수?!</ArticleTitleText>
        <ArticleTitleBottom>
          <div>by. 헬시라이프</div>
          <div>23.07.07</div>
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

const ArticleTag = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.32px;
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
