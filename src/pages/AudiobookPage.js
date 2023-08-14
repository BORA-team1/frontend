//
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//components
import AudiobookTitleBox from "../components/AudiobookPage/AudiobookTitleBox";
import PlayingBar from "../components/AudiobookPage/PlayingBar";
import AudioContent from "../components/AudiobookPage/AudioContent";

//context
import { useAuth } from "../contexts/AuthContext";

// props로 받아올 posts 구조 분해 할당
const AudiobookPage = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const { authToken, BASE_URL } = useAuth();
  const { post_id } = useParams(); // 받아온 post_id
  console.log(post_id);

  const [audio_pk, setAudioPk] = useState(1); // 세부포스트에서 추출한 audio_pk
  const [playlist_pk, setPlaylistPk] = useState(0);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(`${BASE_URL}post/${post_id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }) // 세부포스트 정보 가져오기
      .then((response) => {
        // 세부포스트에서 원하는 정보 추출
        const audioPkFromPost = response.data.data.Audio;
        setAudioPk(audioPkFromPost); // audio_pk 설정
        console.log(audioPkFromPost);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  };

  //오디오북 받아오기
  useEffect(() => {
    getAudio();
  }, []);

  const [audio, setAudio] = useState([]);
  const getAudio = () => {
    axios
      .get(`${BASE_URL}audio/${audio_pk}/${playlist_pk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAudio(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(
          "오디오북 내용을 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  return (
    <>
      <Container>
        <AudiobookTitleBox audio={audio} />
        <Scroll>
          <>
            <Box>
              <AudioContent
                isAudioPlaying={isAudioPlaying}
                audioRef={audioRef}
                audio={audio}
              />
            </Box>
          </>
        </Scroll>
        <PlayingBar
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
          audioRef={audioRef}
          audio={audio}
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
