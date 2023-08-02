//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/MainPage/TopBar";
import TodayArticle from "../components/MainPage/TodayArticle";
import DifficultyArticle from "../components/MainPage/DifficultyArticle";
import InterestArticle from "../components/MainPage/InterestArticle";

//images
import X from "../images/X.svg";

// props로 받아올 posts 구조 분해 할당
const DetailEditorPage = () => {
    const navigate = useNavigate();
    const navigatorM = () => {
        navigate("/mypage"); //이거 함수 불러올 수 있으면 안 써도 되지 않나?
    };
    return (
        <Container>
            <Scroll>
                <>
                    {/* 듣는 아티클 부분 */}
                    <Del src={X} onClick={navigatorM} />
                    <div>에디터 페이지입니다</div>
                </>
            </Scroll>
        </Container>
    );
};

export default DetailEditorPage;

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

const Del = styled.img`
    width: 18px;
    height: 18px;
`;
