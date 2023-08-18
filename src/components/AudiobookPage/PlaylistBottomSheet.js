import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import PlaylistCreateModal from "../AudiobookPage/PlaylistCreateModal";
import PlaylistCompleteModal from "../AudiobookPage/PlaylistCompleteModal";
import Audiobook from "../AudiobookPage/Audiobook";
import { useParams } from "react-router-dom";

const PlaylistBottomSheet = ({
  handleOpenBottomSheet,
  handleCloseBottomSheet,
  playlist,
}) => {
  const navigate = useNavigate();
  const [createModal, setcreateModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const openCreateModal = () => {
    setcreateModal(true);
  };
  const closeCreateModal = () => {
    setcreateModal(false);
  };

  const handleOpenCompleteModal = () => {
    setCompleteModal(true);
  };

  const handleCloseCompleteModal = () => {
    setCompleteModal(false);
  };

  const handleAudiobookClick = (audioId) => {
    console.log(audioId, playlist.playlist_id);
    navigate(`/article/${audioId}/${playlist.playlist_id}`);
    window.location.reload(); // 페이지 새로고침
  };

  // 재생목록 삭제 리스트
  const [playlistItems, setPlaylistItems] = useState([]);
  const [remainingAudioIds, setRemainingAudioIds] = useState([]);
  const { playlist_id } = useParams();

  useEffect(() => {
    setPlaylistItems(playlist?.playlist_audio);
    const newRemainingAudioIds = playlist?.playlist_audio.map((audio) => ({
      audio_id: audio.audio_id,
    }));
    setRemainingAudioIds(newRemainingAudioIds);
  }, [playlist?.playlist_audio]);
  console.log(remainingAudioIds);
  // 삭제된 아이템 필터링하여 새로운 목록 설정
  const handleDeleteAudiobook = (index) => {
    const newPlaylistItems = playlistItems.filter((_, i) => i !== index);
    setPlaylistItems(newPlaylistItems);
    console.log(playlistItems);

    const newRemainingAudioIds = newPlaylistItems.map((audio) => ({
      audio_id: audio.audio_id,
    }));
    setRemainingAudioIds(newRemainingAudioIds);
    console.log(remainingAudioIds);
  };

  if (!handleOpenBottomSheet) return null;
  return (
    <>
      <BottomSheetOverlay>
        <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
          <BottomSheetHeader>
            <HeaderText>
              <CloseBottomSheet onClick={handleCloseBottomSheet}>
                닫기
              </CloseBottomSheet>
              <span>현재 재생목록</span>
            </HeaderText>
            <HR></HR>
          </BottomSheetHeader>

          {/* 아래는 내용 부분 */}
          <BookContatiner>
            {playlistItems && playlistItems.length > 0 ? (
              playlistItems.map((audio, index) => (
                <Audiobook
                  key={index}
                  audio_post={audio.audio_post}
                  long={audio.long}
                  onDelete={() => handleDeleteAudiobook(index)}
                  onClick={() => handleAudiobookClick(audio.audio_id)}
                />
              ))
            ) : (
              <NoPlaylistText>재생목록이 비어 있습니다.</NoPlaylistText>
            )}
          </BookContatiner>
          <SaveContainer>
            <SaveBtn onClick={openCreateModal}>현재 재생목록 저장하기</SaveBtn>
          </SaveContainer>
        </BottomSheetContainer>

        {createModal && (
          <PlaylistCreateModal
            createModal={createModal}
            closeCreateModal={closeCreateModal}
            handleOpenCompleteModal={handleOpenCompleteModal}
            remainingAudioIds={remainingAudioIds}
            playlist_id={playlist_id}
          />
        )}
        {completeModal && (
          <PlaylistCompleteModal
            handleCloseCompleteModal={handleCloseCompleteModal}
          />
        )}
      </BottomSheetOverlay>
    </>
  );
};

export default PlaylistBottomSheet;

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheetOverlay = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 844px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BottomSheetContainer = styled.div`
  width: 100%;
  height: 580px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;

  background: var(--background, #161524);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;

  span {
    color: #fff;
    font-weight: 600;
  }
`;

const CloseBottomSheet = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-right: 109px;
  cursor: pointer;
`;

//컨텐츠 영역
const BookContatiner = styled.div`
  margin-top: 83px;
  width: 370px;
  height: 380px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;

const SaveContainer = styled.div``;

const SaveBtn = styled.div`
  font-family: "Pretendard-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin: 30px 21.5px;

  display: flex;
  width: 276px;
  padding: 10px 35px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--card-color, #2b2c3f);

  cursor: pointer;
`;

const NoPlaylistText = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  text-align: center;
  margin-top: 50px;
`;
