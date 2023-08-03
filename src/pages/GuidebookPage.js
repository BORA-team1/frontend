//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";

//images
import X from "../images/X.svg";

// props로 받아올 posts 구조 분해 할당
const GuidebookPage = () => {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const navigatorA = () => {
        navigate("/audiobookpage"); //이거 함수 불러올 수 있으면 안 써도 되지 않나?
    };
    return (
        <Container>
            <Scroll>
                <>
                    <Box>
                        {/* 듣는 아티클 부분 */}
                        <Del src={X} onClick={navigatorA} />
                        <Title>듣는 아티클 이용법</Title>
                    </Box>
                    <div style={{ margin: "50px" }}>이용법 페이지입니다</div>
                </>
            </Scroll>
        </Container>
    );
};

export default GuidebookPage;

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

const Box = styled.div`
    display: flex;
    flex-direction: row;
    height: 80px;
    align-items: center;
    justify-content: center;

    position: relative;

    border-bottom: 1px solid #353646;
`;

const Title = styled.div`
    margin: 20px;
    color: #fff;
    font-family: "Pretendard";
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
    margin: 20px;
`;
