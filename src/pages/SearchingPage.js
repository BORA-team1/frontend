import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//components
import TopBar from "../components/Common/TopBar";
import DifficultyBox from "../components/MainPage/MainCommon/DifficultyBox";

//images
import app_explaination from "../images/app_explain.svg";
import picked_keyword from "../images/picked_keyword.svg";
import serching_btn from "../images/TopBar/serching_btn.svg";

// props로 받아올 posts 구조 분해 할당
const SearchingPage = () => {
  const BASE_URL = "https://juliaheo.pythonanywhere.com/";

  // 페이지 로드 시 저장된 글 목록을 불러옵니다.
  const [searchKeyword, setSearchKeyword] = useState("");
  const [posts, setPosts] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    if (searchKeyword.trim() === "") {
      // 검색 키워드가 없으면 검색 결과 초기화
      setPosts([]);
      return;
    }

    if (searching) {
      return; // 이미 검색 중이라면 중복 요청 방지
    }

    setSearching(true);

    axios
      .get(`${BASE_URL}post/search/?keyword=${searchKeyword}`)
      .then((response) => {
        setPosts(response.data.data.Post);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("글 목록을 불러오는 중 오류가 발생했습니다.", error);
      })
      .finally(() => {
        setSearching(false);
      });
  };
  return (
    <Container>
      <TopBar />
      <Scroll>
        <>
          {/* 듣는 아티클 부분 */}
          <SearchingBox>
            <SearchingBar
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <SearchingIcon src={serching_btn} onClick={getPosts} />
          </SearchingBox>

          {/* 검색 결과가 없을 때 NoneSearching 표시 */}
          {!searching && posts && posts.length === 0 && (
            <NoneSearching>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
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
              <Explaination src={app_explaination} />
            </NoneSearching>
          )}
          {/* 검색 결과 표시 */}
          {!searching && posts && posts.length > 0 && (
            <DifficultyArticleList>
              {posts.map((article, index) => (
                <DifficultyBox key={index} article={article} />
              ))}
            </DifficultyArticleList>
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

  position: relative;
  max-width: 390px;
  max-height: 844px;
  margin: 0px auto;

  background-color: #161524;
  color: #fff;
`;

const Scroll = styled.div`
  overflow-y: scroll;
  height: 730px;

  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  z-index: 0;
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
  margin: 20px;

  border-radius: 20px;
  background: var(--card-color, #2b2c3f);
`;

const SearchingBar = styled.input`
  width: 290px;

  color: #fff;
  font-family: "Pretendard-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  background-color: transparent;
  border-color: transparent;
  outline: none;

  margin-left: 12px;

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

  margin-left: 20px;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: 20px;
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
  font-family: "Pretendard-Regular";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Explaination = styled.img`
  margin-top: 20px;
  margin-left: 20px;
`;

const DifficultyArticleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0px 20px;
`;

const NoneSearching = styled.div``;
