import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

//components
import WarningModal from "../AudiobookPage/WarningModal";
import PlaylistBottomSheet from "../AudiobookPage/PlaylistBottomSheet";

//img
import playlisticon from "../../images/Audiobook/playlisticon.svg";
import beforesecond from "../../images/Audiobook/beforesecond.svg";
import start from "../../images/Audiobook/start.svg";
import stop from "../../images/Audiobook/stop.svg";
import aftersecond from "../../images/Audiobook/aftersecond.svg";
import bookmarkicon_on from "../../images/Audiobook/bookmarkicon_on.svg";
import bookmarkicon_off from "../../images/Audiobook/bookmarkicon_off.svg";

//context
import { useAuth } from "../../contexts/AuthContext";

//api
import { postBookMark } from "../../api/bookmark";

//audio - 나중에 데이터 파일 만들어서 거기서 다루기
import example from "../../audio/example.mp3";

const PlayingBar = ({
  isAudioPlaying,
  setIsAudioPlaying,
  audioRef,
  audio,
  playlistPk,
}) => {
  //bookmark
  const [bookmarkSrc, setBookmarkSrc] = useState(
    audio.is_booked ? bookmarkicon_off : bookmarkicon_on
  );

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkSrc =
      bookmarkSrc === bookmarkicon_on ? bookmarkicon_off : bookmarkicon_on;
    setBookmarkSrc(newBookmarkSrc);
    postBookMark({ postId: audio.audio_post.post_id });
  };

  // GET: 플레이리스트
  const { authToken, BASE_URL } = useAuth();
  useEffect(() => {
    getPlaylist();
  }, []);

  const [playlist, setPlaylist] = useState([]);
  const getPlaylist = () => {
    {
      playlistPk === 0 &&
        axios
          .get(`${BASE_URL}audio/${playlistPk}/`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            setPlaylist(response.data.data);
            console.log(response.data.data);
          })
          .catch((error) => {
            console.error("재생목록을 불러오는 중 오류가 발생했습니다.", error);
          });
    }
  };

  const [bottomsheet, setBottomsheet] = useState(false);
  const [warningmodal, setWarningModal] = useState(false);
  const handleOpenBottomSheet = () => {
    setBottomsheet(true);
    setWarningModal(false);
  };
  const handleCloseBottomSheet = () => {
    setBottomsheet(false);
  };
  const openWarningModal = () => {
    setWarningModal(true);
    setBottomsheet(false);
  };
  const closeWarningModal = () => {
    setWarningModal(false);
  };

  const handlePlaylistIconClick = () => {
    console.log(playlistPk);
    if (playlistPk == 0) {
      openWarningModal();
    } else {
      handleOpenBottomSheet();
    }
  };

  //오디오 재생 관련 파일
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // 일시 정지
      } else {
        audioRef.current.play(); // 재생
      }
      setIsPlaying(!isPlaying); // 상태 토글
      setIsAudioPlaying(!isAudioPlaying); // isAudioPlaying 상태 변경
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime - 10;
      audioRef.current.currentTime = Math.max(newTime, 0);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + 30;
      audioRef.current.currentTime = Math.min(
        newTime,
        audioRef.current.duration
      );
    }
  };
  return (
    <>
      <Box>
        <PlayListIcon src={playlisticon} onClick={handlePlaylistIconClick} />
        <BeforeSecond onClick={handleSkipBackward} src={beforesecond} />
        <audio ref={audioRef} src={example} />
        <StopnGo onClick={handlePlayPause} src={isPlaying ? stop : start} />
        <AfterSecond onClick={handleSkipForward} src={aftersecond} />
        <BookmarkIcon onClick={handleBookmarkClick} src={bookmarkSrc} />
      </Box>
      {bottomsheet ? (
        <PlaylistBottomSheet
          handleOpenBottomSheet={handleOpenBottomSheet}
          handleCloseBottomSheet={handleCloseBottomSheet}
          playlist={playlist}
        />
      ) : null}
      {warningmodal ? (
        <WarningModal
          openWarningModal={openWarningModal}
          closeWarningModal={closeWarningModal}
        />
      ) : null}
    </>
  );
};

export default PlayingBar;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 55px 50px 55px;

  width: 279px;
  height: 29px;
  background: transparent;
`;

const PlayListIcon = styled.img`
  width: 24px;
  height: 23px;
  cursor: pointer;
`;

const BeforeSecond = styled.img`
  width: 24px;
  height: 27px;
  cursor: pointer;
`;

const StopnGo = styled.img`
  width: 20px;
  height: 27px;
  cursor: pointer;
`;

const AfterSecond = styled.img`
  width: 24px;
  height: 27px;
  cursor: pointer;
`;

const BookmarkIcon = styled.img`
  width: 17px;
  height: 21px;
  cursor: pointer;
`;
