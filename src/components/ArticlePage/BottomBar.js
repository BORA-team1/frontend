import React from 'react';
import styled from 'styled-components';
import han from '../../images/han.svg';
import sentences from '../../images/sentences.svg';
import vote from '../../images/vote.svg';
import debate from '../../images/debate.svg';
import contentOn from '../../images/contentOn.svg';

const BottomBar = ({handleBottomSheet}) => {
  return (
    <BottomBarContainer>
      <div>
        <img
          src={han}
          alt='한마디'
          id='review'
          onClick={handleBottomSheet}
        ></img>
        <span>한마디</span>
      </div>
      <div>
        <img
          src={sentences}
          alt='밑줄모음'
          id='sentences'
          onClick={handleBottomSheet}
        ></img>
        <span>밑줄모음</span>
      </div>
      <div>
        <img src={vote} alt='투표' id='vote' onClick={handleBottomSheet}></img>
        <span>투표만들기</span>
      </div>
      <div>
        <img src={debate} alt='토론'></img>
        <span>토론만들기</span>
      </div>
      <div>
        <img src={contentOn} alt='콘텐츠'></img>
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
