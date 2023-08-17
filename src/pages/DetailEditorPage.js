import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//components
import Editer from '../components/MyPage/Editer';

//images
import X from '../images/X.svg';

//context
import {useAuth} from '../contexts/AuthContext';

// props로 받아올 posts 구조 분해 할당
const DetailEditorPage = () => {
  const navigate = useNavigate();

  // GET: 팔로우한 에디터
  const {authToken, BASE_URL} = useAuth();
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${BASE_URL}mypage/follow/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setData(response.data.data.follow);
        console.log(response.data.data.follow);
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
        <Title>팔로우한 에디터</Title>
      </Box>
      <EditorList>
        {data &&
          data.map((editer) => (
            <Editer key={editer.id} BASE_URL={BASE_URL} editer={editer} />
          ))}
      </EditorList>
    </Container>
  );
};

export default DetailEditorPage;

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
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
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

const EditorList = styled.div`
  margin-top: 30px;
  width: 304px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 14px;
`;
