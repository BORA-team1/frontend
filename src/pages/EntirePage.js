//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";
import DifficultyArticle from "../components/MainPage/MainCommon/DifficultyArticle";

//images
import X from "../images/X.svg";

// props로 받아올 posts 구조 분해 할당
const EntirePage = () => {
    const navigate = useNavigate();
    const path = window.location.pathname;
    return (
        <Container>
            <Scroll>
                <TopBar />
                <>
                    <div style={{ margin: "30px" }}>전체보기 페이지입니다</div>
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
                </>
            </Scroll>
        </Container>
    );
};

export default EntirePage;

//전체 styled

const Container = styled.div`
    display: flex;
    flex-direction: column;
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

const DifficultyArticleList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: 0px 20px;
`;
