import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//components
import TopBar from "../components/Common/TopBar";
import TodayArticle from "../components/MainPage/MainCommon/TodayArticle";
import DifficultyArticle from "../components/MainPage/MainCommon/DifficultyArticle";
import DifficultyBar from "../components/MainPage/DifficultyBar";
import InterestArticle from "../components/MainPage/MainCommon/InterestArticle";
import HotArticle from "../components/MainPage/HotArticle";

//images
import listeningarticle_btn from "../images/ListeningArticleBtn.svg";
import entire_btn from "../images/entireBtn.svg";

//context
import { useAuth } from "../contexts/AuthContext";

const MainPage = () => {
  const [selectDifficulty, setSelectDifficulty] = useState(1);
  const navigate = useNavigate();

  //GET: 메인페이지 데이터
  const { authToken, BASE_URL, nickname } = useAuth();
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}post/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("보는 홈화면을 불러오는 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <Container>
      <TopBar />
      <Scroll>
        {/* 듣는 아티클 부분 */}
        <ListingArticleTitle>
          라디오 아티클 기능 이용하기 📻
        </ListingArticleTitle>
        <ListingArticleEx>
          <span>창밖을보라</span>의 아티클을 라디오처럼 편하게 들어보세요.
        </ListingArticleEx>
        <ListingArticleBtn
          src={listeningarticle_btn}
          onClick={() => {
            navigate("/guidebookpage");
          }}
        />

        {/* 오늘의 아티클 부분 */}
        <TodayTitle>{nickname} 님을 위한 오늘의 아티클 🔮</TodayTitle>
        <TodayArticleListContainer>
          <TodayArticleList>
            {posts.Random &&
              posts.Random.map((article) => (
                <TodayArticle
                  key={article.post_id}
                  article={article}
                ></TodayArticle>
              ))}
          </TodayArticleList>
        </TodayArticleListContainer>

        {/* 난이도 아티클 부분 */}
        <DifficultyTitle>
          <span>난이도 선택</span>해서 부담없이 골라읽기
        </DifficultyTitle>
        <DifficultyBar
          selectDifficulty={selectDifficulty}
          setSelectDifficulty={setSelectDifficulty}
        />
        <DifficultyArticleList>
          <DifficultyArticle selectDifficulty={selectDifficulty} />
        </DifficultyArticleList>
        <EntireBtn
          src={entire_btn}
          onClick={() => {
            navigate("/entirepage");
          }}
        />

        {/*연령대 아티클 부분 */}
        {posts.HotLine && (
          <OtherAgeGroupArticle>
            <AgeGroupTitle>
              우리 부모님
              <span style={{ height: "460px" }}>
                {" "}
                #{posts.HotLine.hot_age}0대
              </span>
              가 관심있는 아티클 엿보기
            </AgeGroupTitle>
            <PickedArticle>
              <HotArticle article={posts.HotPost} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Intro>많은 독자들이 밑줄 그은 문장 -</Intro>
                <PickedSentence>" {posts.HotLine.content} "</PickedSentence>
                <PickedAuthor>by. {posts.HotLine.author}</PickedAuthor>
              </div>
            </PickedArticle>
          </OtherAgeGroupArticle>
        )}

        {/* 관심사 아티클 부분 */}

        <InterestTitle>
          <span>재생목록</span>으로 <span>라디오 아티클</span> 들어보기
        </InterestTitle>
        <InterestArticleList>
          {posts.PlayList &&
            posts.PlayList.map((playlist) => (
              <InterestArticle key={playlist.playlist_id} playlist={playlist} />
            ))}
        </InterestArticleList>
      </Scroll>
    </Container>
  );
};

export default MainPage;

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

//듣는 아티클 부분

const FontStyle = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-style: normal;
`;

const ListingArticleTitle = styled(FontStyle)`
  font-size: 18px;
  font-weight: 600;

  margin-top: 20px;
  margin-left: 20px;
`;

const ListingArticleEx = styled(FontStyle)`
  font-size: 12px;
  font-weight: 500;

  margin: 10px 0px 10px 20px;
  span {
    color: var(--sub-purple, #a397ff);
    font-size: 12px;
    font-weight: 500;
  }
`;

const ListingArticleBtn = styled.img`
  margin: 10px 0px 50px 20px;
`;

//오늘의 아티클 부분

const TodayTitle = styled(FontStyle)`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.36px;

  margin-left: 20px;
`;

const TodayArticleListContainer = styled.div`
  overflow-x: scroll;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TodayArticleList = styled.div`
  display: flex;
  flex-direction: row;
  margin: 25px 20px 50px;
  white-space: nowrap;
  gap: 15px;
`;

// 난이도 아티클 부분

const DifficultyTitle = styled(FontStyle)`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.32px;

  margin-left: 20px;
  span {
    font-weight: 700;
  }
`;

const DifficultyArticleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0px 20px;
`;

const EntireBtn = styled.img`
  margin-top: 30px;
  margin-left: 148.75px;
`;

//연령별 추천 아티클 부분

const OtherAgeGroupArticle = styled.div`
  width: 390px;
  height: 272px;

  margin: 50px 0px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;

  background-color: #242237;
`;

const AgeGroupTitle = styled(FontStyle)`
  padding: 25px 0px 30px 0px;

  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.32px;

  span {
    color: #fff95f;
    font-size: 16px;
    font-weight: 700;
  }
`;

const PickedArticle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 19.8px;

  font-family: "Pretendard-Regular";
  font-style: normal;
`;

const Intro = styled(FontStyle)`
  font-size: 10px;
  font-weight: 700;
  line-height: 154%;
`;

const PickedSentence = styled.div`
  width: 174px;

  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-family: "Jeju Myeongjo", serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 154%;
`;

const PickedAuthor = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  font-weight: 500;
  line-height: 154%;
`;

//취향 아티클 부분

const InterestTitle = styled(FontStyle)`
  margin-top: 44px;
  margin-left: 20px;

  font-size: 16px;
  font-weight: 500;
  line-height: 100%; /* 16px */

  span {
    font-weight: 700;
  }
`;

const InterestArticleList = styled.div`
  display: flex;
  flex-direction: row;
  //오른 쪽 빈 공간 생기지 않게 수정함
  margin: 25px 0px 190px;
  padding-left: 20px;
  gap: 20px;
  box-sizing: border-box;

  overflow-x: scroll;
  width: 390px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
