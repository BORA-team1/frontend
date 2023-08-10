//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";

//images
import X from "../images/X.svg";

import followinggroup1 from "../images/willbedeleted/followinggroup1.svg";
import followinggroup2 from "../images/willbedeleted/followinggroup2.svg";

// props로 받아올 posts 구조 분해 할당
const DetailEditorPage = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const navigatorM = () => {
    navigate("/mypage"); //이거 함수 불러올 수 있으면 안 써도 되지 않나?
  };
  return (
    <Container>
      <Scroll>
        <>
          <Box>
            {/* 듣는 아티클 부분 */}
            <Del src={X} onClick={navigatorM} />
            <Title>팔로우한 에디터</Title>
          </Box>
          <EditorList>
            <EditorImg1 src={followinggroup1} />
            <EditorImg2 src={followinggroup2} />
          </EditorList>
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
  font-family: "Pretendard-Regular";
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

const EditorList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const EditorImg1 = styled.img`
  width: 304px;
  height: 53px;
`;

const EditorImg2 = styled.img`
  width: 92px;
  height: 53px;

  margin-top: 25px;
`;
