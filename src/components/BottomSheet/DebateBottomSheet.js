import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';

import DebateCreateModal from './DebateCreateModal';
import SentenceBox from './SentenceBox';
import DebateBox from './DabateBox';
import addBtn from '../../images/addbutton.png';

//context
import {useAuth} from '../../contexts/AuthContext';
import DebateResult from '../ArticlePage/DebateResult';

const DebateBottomSheet = ({
  handleCloseBottomSheet,
  postPk,
  allRender,
  setAllRender,
}) => {
  const [category, setCategory] = useState('A');
  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');

  //토론 생성 모달 띄우기
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // GET: 진행중인 토론 조회
  const {authToken, BASE_URL, nickname} = useAuth();
  const [render, setRender] = useState(1);
  useEffect(() => {
    getDebates();
    getDoneDebates();
    getMyDebates();
  }, [render]);

  const [debates, setDebates] = useState([]);
  const getDebates = () => {
    axios
      .get(`${BASE_URL}debate/ing/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setDebates(response.data.data.Lines);
        console.log(response.data.data.Lines);
      })
      .catch((error) => {
        console.error(
          '진행중인 토론을 불러오는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  // PATCH: 토론 종료하기
  const handleDebateComplete = (voteId) => {
    axios
      .patch(`${BASE_URL}debate/finish/${voteId}/`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        setAllRender(allRender + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('토론 종료 중 오류가 발생했습니다.', error);
      });
  };

  // GET: 완료된 토론 조회
  const [doneDebates, setDoneDebates] = useState([]);
  const getDoneDebates = () => {
    axios
      .get(`${BASE_URL}debate/done/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setDoneDebates(response.data.data.Lines);
        console.log(response.data.data.Lines);
      })
      .catch((error) => {
        console.error('완료된 토론을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  // GET: 내가 만든 토론 조회
  const [myDebates, setMyDebates] = useState([]);
  const getMyDebates = () => {
    axios
      .get(`${BASE_URL}debate/my/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setMyDebates(response.data.data.Lines);
        console.log(response.data.data.Lines);
      })
      .catch((error) => {
        console.error(
          '내가 만든 토론을 불러오는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  const barPosition = {
    A: '0',
    B: '130px',
    C: '260px',
  };

  return (
    <BottomSheetOverlay>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={handleCloseBottomSheet}>
              닫기
            </CloseBottomSheet>
            <span>토론</span>
          </HeaderText>
          <HR></HR>
          <Category>
            <div>
              <span
                className={category === 'A' ? 'active' : ''}
                onClick={showListA}
              >
                진행중
              </span>
            </div>
            <div>
              <span
                className={category === 'B' ? 'active' : ''}
                onClick={showListB}
              >
                완료된
              </span>
            </div>
            <div>
              <span
                className={category === 'C' ? 'active' : ''}
                onClick={showListC}
              >
                내가참여한
              </span>
            </div>
          </Category>
          <Bar style={{left: barPosition[category]}} />
        </BottomSheetHeader>

        {category === 'A' && (
          <>
            <ListContatiner>
              {debates.length === 0 ? (
                <ListNum>아직 생성된 토론이 없습니다.</ListNum>
              ) : (
                <ListNum>토론 {debates.length}개</ListNum>
              )}
              {debates.map((line, index) => (
                <div key={index}>
                  <SentenceBox lineContent={line.content}></SentenceBox>
                  {line.Debate.map((debate, index) => (
                    <BoxContainer key={index}>
                      <DebateBox
                        debate={debate}
                        nickname={nickname}
                        postPk={postPk}
                        handleDebateComplete={handleDebateComplete}
                      ></DebateBox>
                    </BoxContainer>
                  ))}
                </div>
              ))}
            </ListContatiner>
            <CreateButton src={addBtn} onClick={openModal}></CreateButton>
            {isModalOpen && (
              <DebateCreateModal
                closeModal={closeModal}
                postPk={postPk}
                render={render}
                setRender={setRender}
                allRender={allRender}
                setAllRender={setAllRender}
              ></DebateCreateModal>
            )}
          </>
        )}
        {category === 'B' && (
          <ListContatiner>
            {doneDebates.length === 0 ? (
              <ListNum>아직 완료된 토론이 없습니다.</ListNum>
            ) : (
              <ListNum>토론 {doneDebates.length}개</ListNum>
            )}
            {doneDebates &&
              doneDebates.map((debate, index) => (
                <div key={index}>
                  <SentenceBox lineContent={debate.content}></SentenceBox>
                  {debate.Debate.map((debate, index) => (
                    <BoxContainer key={index}>
                      <DebateResult
                        doneDebate={debate}
                        BASE_URL={BASE_URL}
                      ></DebateResult>
                    </BoxContainer>
                  ))}
                </div>
              ))}
          </ListContatiner>
        )}
        {category === 'C' && (
          <ListContatiner>
            {myDebates.length === 0 ? (
              <ListNum>아직 생성된 토론이 없습니다.</ListNum>
            ) : (
              <ListNum>토론 {myDebates.length}개</ListNum>
            )}
            {myDebates.map((line, index) => (
              <div key={index}>
                <SentenceBox lineContent={line.content}></SentenceBox>
                {line.Debate.map((debate, index) => (
                  <BoxContainer key={index}>
                    <DebateBox
                      debate={debate}
                      nickname={nickname}
                      postPk={postPk}
                      handleDebateComplete={handleDebateComplete}
                    ></DebateBox>
                  </BoxContainer>
                ))}
              </div>
            ))}
          </ListContatiner>
        )}
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default DebateBottomSheet;

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
  height: 100%;
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

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-family: 'Pretendard-Regular';
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
  margin-right: 136px;
  cursor: pointer;
`;

const Category = styled.div`
  width: 390px;
  height: 47px;
  display: flex;
  flex-direction: row;

  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
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
    color: rgba(255, 255, 255, 0.5);
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
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;

const BoxContainer = styled.div`
  width: 390px;
  padding: 20px;
  box-sizing: border-box;
  background: #1e1c2e;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #353646;
  color: #fff;
`;

const CreateButton = styled.img`
  position: absolute;
  right: 20px;
  bottom: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;
