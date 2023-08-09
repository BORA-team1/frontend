import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import TopBar from "../components/Common/TopBar";
import TodayArticle from "../components/MainPage/MainCommon/TodayArticle";
import DifficultyArticle from "../components/MainPage/MainCommon/DifficultyArticle";
import DifficultyBar from "../components/MainPage/DifficultyBar";
import InterestArticle from "../components/MainPage/MainCommon/InterestArticle";

//images
import listeningarticle_btn from "../images/ListeningArticleBtn.svg";
import article_image from "../images/article_image.svg";
import picked_sentence from "../images/PickedSentence.svg";
import entire_btn from "../images/entireBtn.svg";

// props로 받아올 posts 구조 분해 할당
const MainPage = () => {
  const user = "지민";
  const [selectDifficulty, setSelectDifficulty] = useState(1);
  const navigate = useNavigate();
  const navigatorP = () => {
    navigate("/article/1");
  };
  const navigatorE = () => {
    navigate("/entirepage");
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
        <TodayTitle>{user} 님을 위한 오늘의 아티클 🔮</TodayTitle>
        <TodayArticleListContainer>
          <TodayArticleList>
            <TodayArticle navigatorP={navigatorP}></TodayArticle>
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
        <EntireBtn src={entire_btn} onClick={navigatorE} />

        {/*연령대 아티클 부분 */}
        <OtherAgeGroupArticle>
          <AgeGroupTitle>
            우리 부모님 <span style={{ height: "460px" }}>#40대</span>가
            관심있는 아티클 엿보기
          </AgeGroupTitle>
          <PickedArticle>
            <ArticleImage src={article_image} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Intro>많은 독자들이 밑줄 그은 문장 -</Intro>
              <PickedSentence src={picked_sentence} />
              <PickedAuthor>by. 내일은선생님</PickedAuthor>
            </div>
          </PickedArticle>
        </OtherAgeGroupArticle>
        {/* 관심사 아티클 부분 */}
        <>
          <InterestTitle>
            <span>재생목록</span>으로 <span>라디오 아티클</span> 들어보기
          </InterestTitle>
          <InterestArticleList>
            <InterestArticle />
            <InterestArticle />
            <InterestArticle />
            <InterestArticle />
            <InterestArticle />
          </InterestArticleList>
        </>
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

  margin: 40px 0px;

  background-color: #242237;
`;

const AgeGroupTitle = styled(FontStyle)`
  padding: 25px 0px 30px 20px;

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

const Intro = styled(FontStyle)`
  font-size: 10px;
  font-weight: 700;
  line-height: 154%;
`;

const PickedArticle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ArticleImage = styled.img`
  padding: 0px 20px;
`;

const PickedSentence = styled.img`
  padding: 10px 0px 20px;
`;

const PickedAuthor = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-family: "Pretendard";
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 154%;
`;

//취향 아티클 부분

const InterestTitle = styled(FontStyle)`
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
