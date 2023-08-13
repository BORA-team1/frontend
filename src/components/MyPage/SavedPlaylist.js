import React from 'react';
import styled from 'styled-components';

const SavedPlayList = ({playlist}) => {
  return (
    <Box>
      <Picture>{/* 나중에 이미지 4개 넣기 */}</Picture>
      <TitleBox>
        <Title>{playlist.title}</Title>
        <SubTitle>{playlist.des}</SubTitle>
      </TitleBox>
    </Box>
  );
};

export default SavedPlayList;

const Box = styled.div`
  width: 95px;
  border-radius: 10px;
  border: 1px solid #353646;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Picture = styled.div`
  width: 95px;
  height: 73px;
  object-fit: cover;
  border: none;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95px;
  height: 49px;
  padding: 7px;
  box-sizing: border-box;
  gap: 3px;
  background: #2b2c3f;

  font-family: 'Pretendard-Regular';
  font-style: normal;
  color: white;
`;

const Title = styled.div`
  height: 21px;
  text-overflow: ellipsis;
  font-size: 8.571px;
  font-weight: 600;
  line-height: 10.286px;
`;

const SubTitle = styled.div`
  width: 54px;
  text-overflow: ellipsis;
  opacity: 0.5;
  font-size: 6.429px;
  font-style: normal;
  font-weight: 600;
  line-height: 10.286px;
`;
