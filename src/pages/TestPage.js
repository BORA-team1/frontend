//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import DebateBottomSheet from "../../src/components/BottomSheet/DebateBottomSheet";

//images
import X from "../images/X.svg";

// props로 받아올 posts 구조 분해 할당
const TestPage = () => {
    const navigate = useNavigate();
    const navigatorM = () => {
        navigate("/mypage");
    };
    return (
        <Container>
            <DebateBottomSheet />
        </Container>
    );
};

export default TestPage;

//전체 styled

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    position: relative;
    width: 390px;
    height: 844px;
    margin: 0px auto;

    background-color: #161524;
    color: #fff;
`;

const Scroll = styled.div``;
