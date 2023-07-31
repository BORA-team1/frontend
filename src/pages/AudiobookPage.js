import React from "react";
import styled from "styled-components";

//components
import TopBar from "../components/MainPage/TopBar";
import TodayArticle from "../components/MainPage/TodayArticle";
import DifficultyArticle from "../components/MainPage/DifficultyArticle";
import InterestArticle from "../components/MainPage/InterestArticle";

//images
import listeningarticle_btn from "../images/ListeningArticleBtn.svg";

// props로 받아올 posts 구조 분해 할당
const AudiobookPage = () => {
    const user = "지민";
    return (
        <Container>
            <TopBar />
            <Scroll>
                {/* 듣는 아티클 부분 */}
                <ListingArticleTitle>
                    듣는 아티클 기능 이용하기 📻
                </ListingArticleTitle>
                <ListingArticleEx>
                    Bora의 아티클을 라디오처럼 편하게 들어보세요
                </ListingArticleEx>
                <ListingArticleBtn src={listeningarticle_btn} />
                {/* 오늘의 아티클 부분 */}
                <TodayTitle>{user} 님을 위한 오늘의 아티클 🔮</TodayTitle>
                <TodayArticleListContainer>
                    <TodayArticleList>
                        <TodayArticle />
                        <TodayArticle />
                        <TodayArticle />
                        <TodayArticle />
                        <TodayArticle />
                        <TodayArticle />
                    </TodayArticleList>
                </TodayArticleListContainer>
                {/* 난이도 아티클 부분 */}
                <DifficultyTitle>
                    난이도 선택해서 부담없이 골라읽기
                </DifficultyTitle>
                <DifficultyArticleList>
                    <DifficultyArticle
                        author="일상의기쁨"
                        VoteOk={false}
                        DebateOk={false}
                        QnAOk={true}
                    />
                    <DifficultyArticle
                        author="NewRules"
                        VoteOk={false}
                        DebateOk={true}
                        QnAOk={true}
                    />
                    <DifficultyArticle
                        author="K팝고인물"
                        VoteOk={true}
                        DebateOk={false}
                        QnAOk={true}
                    />
                    <DifficultyArticle
                        author="쉬운경제"
                        VoteOk={false}
                        DebateOk={false}
                        QnAOk={true}
                    />
                </DifficultyArticleList>

                {/* 관심사 아티클 부분 */}
                <>
                    <InterestTitle>
                        {user} 님과 관심사가 비슷한 사람들이 읽은 글
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

export default AudiobookPage;

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

const ListingArticleTitle = styled.div`
    color: #fff;
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;

    margin-top: 20px;
    margin-left: 20px;
`;

const ListingArticleEx = styled.div`
    color: #fff;
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;

    margin: 10px 0px 10px 20px;
`;

const ListingArticleBtn = styled.img`
    margin: 10px 0px 50px 20px;
`;

//오늘의 아티클 부분

const TodayTitle = styled.div`
    color: #fff;
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
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

const DifficultyTitle = styled.div`
    color: #fff;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.32px;

    margin-left: 20px;
`;

const DifficultyArticleList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: 0px 20px;
`;

//취향 아티클 부분

const InterestTitle = styled.div`
    margin-left: 20px;

    color: #fff;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 16px */
`;

const InterestArticleList = styled.div`
    display: flex;
    flex-direction: row;
    margin: 25px 20px 190px;

    overflow-x: scroll;
    width: 390px;

    &::-webkit-scrollbar {
        display: none;
    }
`;
