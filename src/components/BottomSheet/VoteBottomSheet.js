import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import VoteCreateModal from "./VoteCreateModal";
import SentenceBox from "./SentenceBox";
import VoteBox from "./VoteBox";
import VoteResult from "../ArticlePage/VoteResult";
import addbutton from "../../images/addbutton.png";

//context
import { useAuth } from "../../contexts/AuthContext";

const VoteBottomSheet = ({ handleCloseBottomSheet, postPk }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("A");

  //투표 생성 모달 띄우기
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //카테고리
  const showListA = () => setCategory("A");
  const showListB = () => setCategory("B");
  const showListC = () => setCategory("C");

  // GET: 진행중인 투표 조회
  const { authToken, BASE_URL, nickname } = useAuth();
  const [render, setRender] = useState(1);
  useEffect(() => {
    getVotes();
    console.log(votes);
    getDoneVotes();
    console.log(doneVotes);
    getMyVotes();
    console.log(myVotes);
  }, [render]);

  const [votes, setVotes] = useState([]);
  const getVotes = () => {
    axios
      .get(`${BASE_URL}vote/ing/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setVotes(response.data.data.Lines);
        console.log(response.data.data.Lines[0].IngVote[0]);
      })
      .catch((error) => {
        console.error(
          "진행중인 투표를 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  // PATCH: 투표 종료하기
  const handleVoteComplete = (voteId) => {
    axios
      .patch(`${BASE_URL}vote/finish/${voteId}/`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error("투표 종료 중 오류가 발생했습니다.", error);
      });
  };

  // GET: 완료된 투표 조회
  const [doneVotes, setDoneVotes] = useState([]);
  const getDoneVotes = () => {
    axios
      .get(`${BASE_URL}vote/done/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setDoneVotes(response.data.data.Lines);
        console.log(response.data.data.Lines);
      })
      .catch((error) => {
        console.error("완료된 투표를 불러오는 중 오류가 발생했습니다.", error);
      });
  };

  // GET: 내가 만든 투표 조회
  const [myVotes, setMyVotes] = useState([]);
  const getMyVotes = () => {
    axios
      .get(`${BASE_URL}vote/my/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setMyVotes(response.data.data.Lines);
        console.log(response.data.data.Lines);
      })
      .catch((error) => {
        console.error(
          "내가 만든 투표를 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  const barPosition = {
    A: "0",
    B: "130px",
    C: "260px",
  };

  return (
    <BottomSheetOverlay>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={handleCloseBottomSheet}>
              닫기
            </CloseBottomSheet>
            <span>투표</span>
          </HeaderText>
          <HR></HR>
          <Category>
            <div>
              <span
                className={category === "A" ? "active" : ""}
                onClick={showListA}
              >
                진행중
              </span>
            </div>
            <div>
              <span
                className={category === "B" ? "active" : ""}
                onClick={showListB}
              >
                완료된
              </span>
            </div>
            <div>
              <span
                className={category === "C" ? "active" : ""}
                onClick={showListC}
              >
                내가만든
              </span>
            </div>
          </Category>
          <Bar style={{ left: barPosition[category] }} />
        </BottomSheetHeader>

        {/* 카테고리 별 리스트*/}
        {category === "A" && (
          <>
            <ListContatiner>
              {votes.length === 0 ? (
                <ListNum>아직 생성된 투표가 없습니다.</ListNum>
              ) : (
                <ListNum>투표 {votes.length}개</ListNum>
              )}

              {votes &&
                votes.map((vote, index) => (
                  <div key={index}>
                    <SentenceBox lineContent={vote.content}></SentenceBox>
                    <VoteBoxContainer>
                      <VoteBox ingvote={vote.IngVote[0]}></VoteBox>
                      {vote.IngVote[0].vote_user.nickname === nickname && (
                        <VoteEnd
                          onClick={() =>
                            handleVoteComplete(vote.IngVote[0].vote_id)
                          }
                        >
                          투표 종료하기
                        </VoteEnd>
                      )}
                    </VoteBoxContainer>
                  </div>
                ))}
            </ListContatiner>
            <CreateButton src={addbutton} onClick={openModal}></CreateButton>
            {isModalOpen && (
              <VoteCreateModal
                closeModal={closeModal}
                postPk={postPk}
                render={render}
                setRender={setRender}
              ></VoteCreateModal>
            )}
          </>
        )}
        {category === "B" && (
          <ListContatiner>
            <ListNum>투표 {doneVotes.length}개</ListNum>
            {doneVotes &&
              doneVotes.map((vote, index) => (
                <div key={index}>
                  <SentenceBox lineContent={vote.content}></SentenceBox>
                  <VoteResultContainer>
                    <VoteResult donevote={vote.DoneVote[0]}></VoteResult>
                  </VoteResultContainer>
                </div>
              ))}
          </ListContatiner>
        )}
        {category === "C" && (
          <ListContatiner>
            {myVotes.length === 0 ? (
              <ListNum>아직 생성된 투표가 없습니다.</ListNum>
            ) : (
              <ListNum>투표 {myVotes.length}개</ListNum>
            )}
            {myVotes.map((vote, index) => (
              <div key={index}>
                <SentenceBox lineContent={vote.content}></SentenceBox>
                {vote.IngVote[0] && (
                  <VoteBoxContainer>
                    <VoteBox ingvote={vote.IngVote[0]}></VoteBox>
                  </VoteBoxContainer>
                )}
                {vote.DoneVote[0] && (
                  <VoteResultContainer>
                    <VoteResult
                      user={vote.DoneVote.vote_user}
                      donevote={vote.DoneVote[0]}
                    ></VoteResult>
                  </VoteResultContainer>
                )}
              </div>
            ))}
          </ListContatiner>
        )}
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default VoteBottomSheet;

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
  height: 780px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;
  font-family: "Pretendard-Regular";
  font-style: normal;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-size: 15px;
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
  margin-right: 136px;
  cursor: pointer;
`;

const Category = styled.div`
  width: 390px;
  height: 47px;
  display: flex;
  flex-direction: row;

  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.28px;
  color: rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-bottom: 1px solid rgba(53, 54, 70, 0.3);

  div {
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div > span {
    cursor: pointer;
  }

  div > span.active {
    color: white;
  }
`;

const Bar = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 130px;
  background-color: white;
  transition: left 0.3s ease;
`;

const ListContatiner = styled.div`
  margin-top: 125px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const ListNum = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;

const VoteBoxContainer = styled.div`
  width: 390px;
  padding: 20px;
  box-sizing: border-box;
  background: #1e1c2e;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #353646;
  color: #fff;
`;
const VoteEnd = styled.div`
  padding: 7px 14px;
  width: fit-content;
  margin-top: 30px;
  border-radius: 20px;
  border: 1.2px solid #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const VoteResultContainer = styled.div`
  width: 390px;
  padding: 20px 50px;
  box-sizing: border-box;
  background: #1e1c2e;
  display: flex;
  border-bottom: 1px solid #353646;
`;

const CreateButton = styled.img`
  position: absolute;
  right: 20px;
  bottom: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
`;
