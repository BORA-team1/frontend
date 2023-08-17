import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//components
import TopBar from '../components/Common/TopBar';
import DifficultyBox from '../components/MainPage/MainCommon/DifficultyBox';

//images
import app_explaination from '../images/app_explain.svg';
import picked_keyword from '../images/picked_keyword.svg';
import serching_btn from '../images/TopBar/serching_btn.svg';

//context
import {useAuth} from '../contexts/AuthContext';

const SearchingPage = () => {
  const [searchKeyword, setSearchKeyword] = useState();
  const [isSearchOn, setSearchOn] = useState(false);

  // GET: 검색 결과
  const {authToken, BASE_URL} = useAuth();
  const [posts, setPosts] = useState([]);
  const getResult = () => {
    if (searchKeyword) {
      axios
        .get(`${BASE_URL}post/search/?keyword=${searchKeyword}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setSearchOn(true);
          setPosts(response.data.data.Post);
          console.log(response.data.data.Post);
        })
        .catch((error) => {
          console.error('검색 결과를 불러오는 중 오류가 발생했습니다.', error);
        });
    }
  };

  return (
    <Container>
      <TopBar />
      <Scroll>
        <>
          <SearchingBox>
            <SearchingBar
              placeholder='검색어를 입력하세요'
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <SearchingIcon onClick={getResult} src={serching_btn} />
          </SearchingBox>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PickedKeyword src={picked_keyword}></PickedKeyword>
            <KeywordsList>
              <Keyword>#라이프</Keyword>
              <Keyword>#테크</Keyword>
              <Keyword>#건강</Keyword>
              <Keyword>#세계</Keyword>
            </KeywordsList>
          </div>

          {!isSearchOn && <Explaination src={app_explaination} />}

          {posts ? (
            posts.map((article, index) => (
              <>
                <ResultNum>검색 결과 </ResultNum>
                <DifficultyBox key={index} article={article} />
              </>
            ))
          ) : (
            <ResultNum>검색 결과가 없습니다. </ResultNum>
          )}
        </>
      </Scroll>
    </Container>
  );
};

export default SearchingPage;

//전체 styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  padding: 30px 20px;
  box-sizing: border-box;
  gap: 20px;
`;

//검색 바 부분

const SearchingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 350px;
  height: 43px;
  flex-shrink: 0;

  border-radius: 20px;
  background: var(--card-color, #2b2c3f);
`;

const SearchingBar = styled.input`
  width: 290px;
  padding-left: 10px;

  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  background-color: transparent;
  border-color: transparent;
  outline: none;

  .input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchingIcon = styled.img`
  width: 15px;
  height: 15px;

  margin-right: 12px;
`;

//아래 부분

const PickedKeyword = styled.img`
  width: 54px;
  height: 16px;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-direction: row;
`;

const Keyword = styled.div`
  padding: 7px 14px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px 10px 0px;

  border-radius: 20px;
  border: 1px solid var(--sub-purple, #a397ff);

  color: var(--sub-purple, #a397ff);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
`;

const ResultNum = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 600;
  line-height: 133.5%; /* 16.02px */
  letter-spacing: -0.24px;
`;

const Explaination = styled.img`
  width: 280px;
  height: 75px;
`;

const DifficultyArticleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0px 20px;
`;

const NoneSearching = styled.div``;
