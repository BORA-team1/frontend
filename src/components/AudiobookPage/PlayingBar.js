import React, { useState, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "react-audio-player";

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

//audio - 나중에 데이터 파일 만들어서 거기서 다루기
import example from "../../audio/example.m4a";

const PlayingBar = () => {
    //bookmark
    const [bookmark, setBookmark] = useState(false);
    const reBookmark = () => {
        setBookmark(!bookmark);
    };

    //playlist - 나중에 넘겨줘야 하는 거

    const [bottomsheet, setBottomsheet] = useState(true);
    const [warningmodal, setWarningModal] = useState(true);
    const [OK, setOK] = useState(false); //클릭했는지 안했는지 판단
    const reOK = () => {
        setOK(true);
    };
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

    const [playlist, setPlaylist] = useState(true); //단일 아티클인지, 플레이리스트 있는지 판단
    const handleClick = () => {
        reOK();
        if (playlist && OK) {
            handleOpenBottomSheet(); // 바텀시트를 열기 위한 함수
        } else if (!playlist && OK) {
            openWarningModal(); // 모달을 열기 위한 함수
        }
    };

    //오디오 재생 관련 파일
    const audioRef = useRef(null); // useRef를 사용합니다.
    const [stopgo, setStopGo] = useState(false); //나중에 전달하면서 사용!
    const reStopGo = () => {
        setStopGo(!stopgo);
    };
    const [audioPlaying, setAudioPlaying] = useState(false); // 오디오 재생 여부 상태
    const [currentTime, setCurrentTime] = useState(0); // 오디오 현재 재생 시간

    // BookmarkIcon 버튼 클릭 시 30초 뒤로 이동
    const handleSkipForward = () => {
        if (audioRef.current) {
            const newTime = audioRef.current.audioEl.currentTime + 30;
            audioRef.current.audioEl.currentTime = Math.min(
                newTime,
                audioRef.current.audioEl.duration
            );
            setCurrentTime(newTime);
        }
    };

    // BeforeSecond 버튼 클릭 시 10초 전으로 이동
    const handleSkipBackward = () => {
        if (audioRef.current) {
            const newTime = audioRef.current.audioEl.currentTime - 10;
            audioRef.current.audioEl.currentTime = Math.max(newTime, 0);
            setCurrentTime(newTime);
        }
    };

    // StopnGo 버튼 클릭 시 오디오 재생 또는 정지
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioPlaying) {
                audioRef.current.audioEl.pause();
                console.log(audioPlaying);
            } else {
                audioRef.current.audioEl.play();
                console.log(audioPlaying);
            }
            setAudioPlaying(!audioPlaying);
            console.log(audioPlaying);
        } else {
            console.log(audioPlaying);
        }
    };
    return (
        <>
            <Box>
                <PlayListIcon src={playlisticon} onClick={handleClick} />
                <BeforeSecond onClick={handleSkipBackward} src={beforesecond} />
                <StopnGo
                    onClick={handlePlayPause}
                    src={audioPlaying ? stop : start}
                />
                <AfterSecond onClick={handleSkipForward} src={aftersecond} />
                <BookmarkIcon
                    onClick={reBookmark}
                    src={bookmark ? bookmarkicon_on : bookmarkicon_off}
                />
            </Box>
            {playlist && OK && bottomsheet ? (
                <PlaylistBottomSheet
                    handleOpenBottomSheet={handleOpenBottomSheet}
                    handleCloseBottomSheet={handleCloseBottomSheet}
                />
            ) : null}
            {!playlist && OK && warningmodal ? (
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
`;

const PlayListIcon = styled.img`
    width: 24px;
    height: 23px;
`;

const BeforeSecond = styled.img`
    width: 24px;
    height: 27px;
`;

const StopnGo = styled.img`
    width: 20px;
    height: 27px;
`;

const AfterSecond = styled.img`
    width: 24px;
    height: 27px;
`;

const BookmarkIcon = styled.img`
    width: 17px;
    height: 21px;
`;