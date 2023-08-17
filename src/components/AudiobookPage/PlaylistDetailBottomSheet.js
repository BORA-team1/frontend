import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import copy from "copy-to-clipboard";
import axios from "axios";

//context
import { useAuth } from "../../contexts/AuthContext";
//img
import share from "../../images/Audiobook/share.svg";
import follow from "../../images/Audiobook/follow.svg";
import check from "../../images/Audiobook/check.svg";

const PlaylistDetailBottomSheet = ({ handleCloseBottomSheet, user_id }) => {
  const [showInstruction, setShowInstruction] = useState(false);
  const [followInstruction, setFollowInstruction] = useState(false);
  //주소 복사
  const copyURLToClipboard = () => {
    const currentURL = window.location.href;
    copy(currentURL);
    setShowInstruction(true);
  };
  const { authToken, BASE_URL } = useAuth();

  //POST: 에디터 팔로우
  const followUser = (user_pk, authToken) => {
    axios
      .post(`${BASE_URL}mypage/following/${user_pk}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("유저를 팔로우했습니다.", response);
        showFollowInstruction();
      })
      .catch((error) => {
        console.error("유저 팔로우 중 오류가 발생했습니다.", error);
      });
  };

  //팔로우 버튼
  const showFollowInstruction = () => {
    setFollowInstruction(true);
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
              onClick={() => followUser(user_id, authToken)}
            />
          </BookContatiner>
        </BottomSheetContainer>
      </BottomSheetOverlay>

      {showInstruction && (
        <InstructionContainer>
          <Check src={check} />
          <InstructionText>URL 복사가 완료되었습니다!</InstructionText>
        </InstructionContainer>
      )}

      {followInstruction && (
        <InstructionContainer disappear>
          <Check src={check} />
          <InstructionText>해당 에디터를 팔로우했습니다!</InstructionText>
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
  width: 260px;
  height: 54px;
  padding: 0px 31px;
  display: flex;
  align-items: center;

  border-radius: 10px;
  background: #595584;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);

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
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;
  text-align: center;

  margin: 10px 11.5px;
`;

const Check = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
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
