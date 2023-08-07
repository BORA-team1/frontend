import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

//components
import PlaylistCreateModal from "../AudiobookPage/PlaylistCreateModal";
import PlaylistCompleteModal from "../AudiobookPage/PlaylistCompleteModal";
import Audiobook from "../AudiobookPage/Audiobook";

//img
import savebtn from "../../images/Audiobook/savebtn.svg";

const PlaylistBottomSheet = ({
    handleOpenBottomSheet,
    handleCloseBottomSheet,
}) => {
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

                    {/* 아래는 내용 부분 - 스크롤 기능 넣을 것!*/}
                    <BookContatiner>
                        <Audiobook />
                        <Audiobook />
                        <Audiobook />
                        <Audiobook />
                        <Audiobook />
                        <Audiobook />
                    </BookContatiner>
                    <SaveContainer>
                        <SaveBtn src={savebtn} onClick={openCreateModal} />
                    </SaveContainer>
                </BottomSheetContainer>

                {createModal ? (
                    <>
                        <PlaylistCreateModal
                            createModal={createModal}
                            closeCreateModal={closeCreateModal}
                            handleOpenCompleteModal={handleOpenCompleteModal}
                        />

                        {completeModal && (
                            <PlaylistCompleteModal
                                completeModal={completeModal}
                                handleCloseCompleteModal={
                                    handleCloseCompleteModal
                                }
                            />
                        )}
                    </>
                ) : null}
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

const SaveBtn = styled.img`
    margin: 30px 21.5px;
`;
