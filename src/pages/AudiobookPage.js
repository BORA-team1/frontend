//
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import AudiobookTitleBox from "../components/AudiobookPage/AudiobookTitleBox";
import PlayingBar from "../components/AudiobookPage/PlayingBar";
import AudioContent from "../components/AudiobookPage/AudioContent";
import AudoContent_sentence from "../components/AudiobookPage/AudoContent_sentence";

//images
import X from "../images/X.svg";

// props로 받아올 posts 구조 분해 할당
const AudiobookPage = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <>
      <Container>
        <AudiobookTitleBox />
        <Scroll>
          <>
            <Box>
              <AudioContent
                isAudioPlaying={isAudioPlaying}
                audioRef={audioRef}
              />
            </Box>
          </>
        </Scroll>
        <PlayingBar
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
          audioRef={audioRef}
        />
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
