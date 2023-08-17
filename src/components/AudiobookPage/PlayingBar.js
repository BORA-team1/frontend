import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
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

const PlayingBar = ({
  isAudioPlaying,
  setIsAudioPlaying,
  audioRef,
  audio,
  playlistPk,
}) => {
  //bookmark
  const [bookmarkSrc, setBookmarkSrc] = useState(
    audio.is_booked ? bookmarkicon_on : bookmarkicon_off
  );

  const handleBookmarkClick = (e) => {
    console.log(audio.is_booked);
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

  // GET: 다음 곡 조회

  const [nextAudio, setNextAudio] = useState();
  const navigate = useNavigate();
  const { audio_id, playlist_id } = useParams();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [audioRef]);

  const handleAudioEnded = () => {
    getNextAudio(); // 다음 곡 정보 가져오기
  };
  const getNextAudio = () => {
    {
      axios
        .get(`${BASE_URL}audio/next/${audio_id}/${playlist_id}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setNextAudio(response);
          console.log(response.data.audio);
          // 다음 곡으로 이동
          if (response.data) {
            navigate(`/article/${response.data.audio}/${playlist_id}`);
          }
          window.location.reload(); // 페이지 새로고침
        })
        .catch((error) => {
          console.error("재생목록을 불러오는 중 오류가 발생했습니다.", error);
        });
    }
  };

  const [bottomsheet, setBottomsheet] = useState(false);
  const [warningmodal, setWarningModal] = useState(false);
  const [playlistLoaded, setPlaylistLoaded] = useState(false);
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
      if (!playlistLoaded) {
        getPlaylist(); // 플레이리스트를 처음 클릭할 때만 불러옴
        setPlaylistLoaded(true);
      }
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
      if (newTime < audioRef.current.duration) {
        audioRef.current.currentTime = newTime;
      } else {
        audioRef.current.currentTime = audioRef.current.duration;
      }
    }
  };
  return (
    <>
      <Box>
        <PlayListIcon src={playlisticon} onClick={handlePlaylistIconClick} />
        <BeforeSecond onClick={handleSkipBackward} src={beforesecond} />
        <audio ref={audioRef} src={`${BASE_URL}${audio.audiofile}`} />
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
