import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//images
import X from '../images/X.svg';
// import TodayArticle from '../components/MainPage/MainCommon/TodayArticle';

//context
import {useAuth} from '../contexts/AuthContext';

const DetailBookmarkPage = () => {
  const navigate = useNavigate();

  // GET: 북마크한 아티클
  const {authToken, BASE_URL} = useAuth();
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${BASE_URL}mypage/bookmark/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setData(response.data.data.bookmarkPost);
        console.log(response.data.data.bookmarkPost);
      })
      .catch((error) => {
        console.error(
          '북마크 데이터를 불러오는 중 오류가 발생했습니다.',
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
        <Title>북마크</Title>
      </Box>
      <BookMarkList>
        {/* {data &&
              data.map((article) => (
                <TodayArticle key={article.post_id} article={article} />
              ))} */}
      </BookMarkList>
    </Container>
  );
};

export default DetailBookmarkPage;

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

const BookMarkList = styled.div`
  margin-top: 30px;
  width: 307px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;
