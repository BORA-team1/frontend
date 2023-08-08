//
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import AudiobookTitleBox from "../components/AudiobookPage/AudiobookTitleBox";
import PlayingBar from "../components/AudiobookPage/PlayingBar";
import SentenceSplit from "../components/Common/SentenceSplit";
import AudioContent from "../components/AudiobookPage/AudioContent";

//images
import X from "../images/X.svg";

// props로 받아올 posts 구조 분해 할당
const AudiobookPage = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const navigatorM = () => {
    navigate("/mypage"); //이거 함수 불러올 수 있으면 안 써도 되지 않나?
  };

  return (
    <>
      <Container>
        <AudiobookTitleBox />
        <Scroll>
          <>
            <Box>
              <AudioContent />
            </Box>
          </>
        </Scroll>
        <PlayingBar />
      </Container>
    </>
  );
};

export default AudiobookPage;

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
  background: linear-gradient(
    180deg,
    rgba(22, 21, 36, 0.3) 0%,
    rgba(90, 69, 245, 0.3) 50.29%,
    rgba(21, 20, 34, 0.3) 100%
  );
`;
