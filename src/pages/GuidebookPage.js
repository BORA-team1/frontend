//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";

//images
import step1 from "../images/guidepage/step1.svg";
import step2 from "../images/guidepage/step2.svg";
import introduce_bora from "../images/guidepage/introduceBora.svg";

// props로 받아올 posts 구조 분해 할당
const GuidebookPage = () => {
  return (
    <Container>
      <TopBar />
      <Scroll>
        <>
          <Step1 src={step1} />
          <Step2 src={step2} />
          <Introducing src={introduce_bora} />
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

  width: 390px;
  height: 844px;
  margin: 0px auto;

  background-color: #161524;
  color: #fff;
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  height: 730px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Step1 = styled.img`
  width: 209px;
  height: 42px;
  margin-top: 500px; //원래 30px
`;

const Step2 = styled.img`
  width: 209px;
  height: 42px;
  margin-top: 330px;
`;

const Introducing = styled.img`
  width: 246px;
  height: 342px;
  margin-top: 347px;
  margin-bottom: 80px;
`;
