import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const SavedPlayList = ({playlist, BASE_URL}) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate(`/article/${playlist.first_audio}/${playlist.playlist_id}/`);
      }}
    >
      <Picture>
        {playlist.img.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={`${BASE_URL}${image}`}
            alt={`playlist image ${index + 1}`}
          />
        ))}
      </Picture>
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
  border: none;
  display: grid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  grid-template-columns: repeat(2, 47.5px);
  grid-template-rows: repeat(2, 36.5px);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95px;
  height: 49px;
  padding: 7px;
  box-sizing: border-box;
  gap: 5px;
  background: #2b2c3f;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

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
