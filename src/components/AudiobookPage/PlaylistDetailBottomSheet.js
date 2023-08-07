import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import copy from "copy-to-clipboard";

//components
import PlaylistCreateModal from "../AudiobookPage/PlaylistCreateModal";

//img
import share from "../../images/Audiobook/share.svg";
import follow from "../../images/Audiobook/follow.svg";

const PlaylistDetailBottomSheet = ({ handleCloseBottomSheet }) => {
    const [showInstruction, setShowInstruction] = useState(false);
    const [followInstruction, setFollowInstruction] = useState(false);
    //주소 복사
    const copyURLToClipboard = () => {
        const currentURL = window.location.href;
        copy(currentURL);
        setShowInstruction(true);
    };

    //팔로우 버튼
    const showFollowInstruction = () => {
        setFollowInstruction(true);
    };

    //닫는 코드인데 어디에 쓰면 좋을지, 쓰면 제대로 작동하는지~~,,
    const handleCloseSheetAndInstruction = () => {
        setShowInstruction(false);
        handleCloseBottomSheet();
    };

    //시간 재는 코드
    useEffect(() => {
        if (showInstruction) {
            const timer = setTimeout(() => {
                setShowInstruction(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [showInstruction]);

    // 시간 재는 코드 (followInstruction)
    useEffect(() => {
        if (followInstruction) {
            const timer = setTimeout(() => {
                setFollowInstruction(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [followInstruction]);

    return (
        <>
            <BottomSheetOverlay>
                <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
                    <BottomSheetHeader>
                        <HeaderText>
                            <CloseBottomSheet onClick={handleCloseBottomSheet}>
                                닫기
                            </CloseBottomSheet>
                            <span>자세히 보기</span>
                        </HeaderText>
                        <HR></HR>
                    </BottomSheetHeader>

                    {/* 아래는 내용 부분*/}
                    <BookContatiner>
                        <ShareBtn src={share} onClick={copyURLToClipboard} />
                        <FollowBtn
                            src={follow}
                            onClick={showFollowInstruction}
                        />
                    </BookContatiner>
                </BottomSheetContainer>
            </BottomSheetOverlay>

            {showInstruction && (
                <InstructionContainer>
                    <InstructionText>
                        URL 복사가 완료되었습니다!
                    </InstructionText>
                </InstructionContainer>
            )}

            {followInstruction && (
                <InstructionContainer disappear>
                    <InstructionText>
                        해당 에디터를 팔로우했습니다!
                    </InstructionText>
                </InstructionContainer>
            )}
        </>
    );
};

export default PlaylistDetailBottomSheet;

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
    height: 230px;
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

    display: flex;
    flex-direction: column;
    padding: 30px 25px;
    gap: 25px;
`;

const HR = styled.div`
    width: 390px;
    height: 5px;
    background: #353646;
`;

const ShareBtn = styled.img`
    width: 284px;
    height: 23px;
`;

const FollowBtn = styled.img`
    width: 284px;
    height: 23px;
`;

const InstructionContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 50%; /* Instruction 수평 중앙 */
    transform: translateX(-50%); /* Instruction 수평 중앙 */
    z-index: 10;
    width: 257px;
    height: 35px;
    padding: 0px 31px;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background: var(--main-purple, #5a45f5);

    /* Instruction이 나타날 때의 애니메이션 적용 */
    ${(props) =>
        !props.disappear &&
        css`
            animation: ${appearAnimation} 0.3s ease-in-out;
        `}

    //Instruction이 사라질 때의 애니메이션 적용
    ${(props) =>
        props.disappear &&
        css`
            animation: ${disappearAnimation} 0.3s ease-in-out;
        `}
`;

const InstructionText = styled.div`
    color: #fff;
    text-align: center;
    font-family: "Pretendard-Regular";
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 15px */
    letter-spacing: -0.3px;

    margin: 10px 11.5px;
`;

const appearAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const disappearAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
`;
