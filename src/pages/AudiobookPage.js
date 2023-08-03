import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import TopBar from "../components/Common/TopBar";
import TodayArticle from "../components/MainPage/MainCommon/TodayArticle";
import DifficultyArticle from "../components/MainPage/MainCommon/DifficultyArticle";
import InterestArticle from "../components/MainPage/MainCommon/InterestArticle";

//images
import listeningarticle_title from "../images/listening_article_title.svg";
import listeningarticle_ex from "../images/listening_article_ex.svg";
import howtouse_btn from "../images/howtouse_listening_article.svg";

// props로 받아올 posts 구조 분해 할당
const AudiobookPage = () => {
    const user = "지민";
    const navigate = useNavigate();
    const navigatorG = () => {
        navigate("/guidebookpage"); //이거 함수 불러올 수 있으면 안 써도 되지 않나?
    };
    return (
        <Container>
            <TopBar />
            <Scroll>
                {/* 듣는 아티클 부분 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <ListingArticleTitle src={listeningarticle_title} />
                    <ListingArticleEx src={listeningarticle_ex} />
                    <ListingArticleBtn
                        src={howtouse_btn}
                        onClick={navigatorG}
                    />
                </div>
                {/* 오늘의 아티클 부분 */}
                <TodayArticleBox>
                    <TodayTitle>{user} 님을 위한 듣는 아티클</TodayTitle>
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
                </TodayArticleBox>
                {/* 난이도 아티클 부분 */}
                <DifficultyTitle>오늘 새로 나온 아티클 듣기</DifficultyTitle>
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
                        재생목록으로 듣는 아티클 시작하기
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

const ListingArticleTitle = styled.img`
    margin-top: 30px;
`;

const ListingArticleEx = styled.img`
    margin-top: 20px;
`;

const ListingArticleBtn = styled.img`
    margin-top: 20px;
`;

//오늘의 아티클 부분

const TodayArticleBox = styled.div`
    width: 390px;
    height: 272px;
    margin: 50px 0px;

    background: var(--sub-background, #242237);
`;

const TodayTitle = styled.div`
    color: #fff;
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.36px;

    margin-left: 85px; //center로 맞추는 게 훨씬 나을 듯
    padding-top: 20px;
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
    margin-top: 30px;

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
