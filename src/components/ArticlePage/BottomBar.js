import React from 'react';
import styled from 'styled-components';
import 한마디 from '../../images/한마디.svg';
import 밑줄모음 from '../../images/밑줄모음.svg';
import 투표 from '../../images/투표.svg';
import 토론 from '../../images/토론.svg';
import 콘텐츠 from '../../images/콘텐츠.svg';

const BottomBar = () => {
  return (
    <BottomBarContainer>
      <div>
        <img src={한마디} alt='한마디'></img>
        <span>한마디</span>
      </div>
      <div>
        <img src={밑줄모음} alt='밑줄모음'></img>
        <span>밑줄모음</span>
      </div>
      <div>
        <img src={투표} alt='투표'></img>
        <span>투표만들기</span>
      </div>
      <div>
        <img src={토론} alt='토론'></img>
        <span>토론만들기</span>
      </div>
      <div>
        <img src={콘텐츠} alt='콘텐츠'></img>
        <span>콘텐츠켜짐</span>
      </div>
    </BottomBarContainer>
  );
};

export default BottomBar;

const BottomBarContainer = styled.div`
  width: 390px;
  height: 67.95px;
  position: fixed;
  bottom: 0px;
  background: var(--background, #161524);
  box-shadow: 0px -0.5px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 19.5px;

  div {
    width: 45.5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 18.299px;
    height: auto;
    margin-bottom: 6.41px;
    cursor: pointer;
  }

  span {
    color: #fff;
    text-align: center;
    font-family: 'Pretendard-Regular';
    font-size: 7.184px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
