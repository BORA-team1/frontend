import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//images
import X from '../images/X.svg';

//context
import {useAuth} from '../contexts/AuthContext';

const DetailPlaylistPage = () => {
  const navigate = useNavigate();

  // GET: 저장한 재생목록
  const {authToken, BASE_URL} = useAuth();
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${BASE_URL}mypage/mypli/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setData(response.data.data.myPlaylist);
        console.log(response.data.data.myPlaylist);
      })
      .catch((error) => {
        console.error(
          '팔로우한 에디터를 불러오는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  return (
    <Container>
      <Box>
        <Del
          src={X}
          onClick={() => {
            navigate('/mypage');
          }}
        />
        <Title>저장한 재생목록</Title>
      </Box>
      <PlaylistList>
        {data &&
          data.map((playlist) => (
            <PlaylistBox
              key={playlist.playlist_id}
              onClick={() => {
                navigate(
                  `/article/${playlist.first_audio}/${playlist.playlist_id}/`
                );
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
                <PlaylistTitle>{playlist.title}</PlaylistTitle>
                <SubTitle>{playlist.des}</SubTitle>
              </TitleBox>
            </PlaylistBox>
          ))}
      </PlaylistList>
    </Container>
  );
};

export default DetailPlaylistPage;

//전체 styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 390px;
  height: 844px;
  margin: 0px auto;

  background-color: #161524;
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-style: normal;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 390px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #353646;
`;

const Title = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;
`;

const Del = styled.img`
  position: absolute;
  left: 20px;
  width: 18px;
  height: 18px;
`;

const PlaylistList = styled.div`
  margin-top: 30px;
  width: 307px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

//하나의 재생목록 박스
const PlaylistBox = styled.div`
  width: 145.615px;
  border-radius: 10px;
  border: 1px solid #353646;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Picture = styled.div`
  border: none;
  display: grid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  grid-template-columns: repeat(2, 72.8075px);
  grid-template-rows: repeat(2, 55.9465px);
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
  width: 145.615px;
  padding: 10.73px;
  box-sizing: border-box;
  gap: 4.598px;
  background: #2b2c3f;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const PlaylistTitle = styled.div`
  text-overflow: ellipsis;
  font-size: 13.138px;
  font-weight: 600;
  line-height: 15.766px;
`;

const SubTitle = styled.div`
  width: 82.77px;
  text-overflow: ellipsis;
  opacity: 0.5;
  font-size: 9.854px;
  font-weight: 600;
  line-height: 15.766px;
`;
