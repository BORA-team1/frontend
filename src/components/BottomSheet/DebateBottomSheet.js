import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';

import addBtn from '../../images/addbutton.png';
import DebateCreateModal from './DebateCreateModal';
import SentenceBox from './SentenceBox';
import DebateBox from './DabateBox';

const DebateBottomSheet = ({handleCloseBottomSheet}) => {
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

  // 주제, 참여인원 입력 변경 이벤트 처리
  const [debateTitle, setDebateTitle] = useState(''); //토론 타이틀
  const [participants, setParticipants] = useState(4); //토론 인원
  const [debates, setDebates] = useState([]); // 생성된 토론이 저장되는 배열

  //토론 참여 인원 변경
  const handleParticipantChange = (value) => {
    setParticipants(value);
  };

  // 모달에서 등록 버튼을 눌렀을 때 실행되는 함수 (토론 생성)
  const handleSubmit = () => {
    closeModal();

    // State들 배열로 저장
    const newDebate = {
      title: debateTitle,
      participants: participants,
    };

    console.log(newDebate);

    // 토론 리스트에 추가
    setDebates([...debates, newDebate]);

    // 저장 후 초기화
    setDebateTitle('');
    setParticipants(-1);
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

        {/* 카테고리에 맞는 리스트가 뜨게끔 추후에 수정할 예정 */}
        {category === 'A' && (
          <>
            <ListContatiner>
              {debates.length === 0 ? (
                <ListNum>아직 생성된 토론이 없습니다.</ListNum>
              ) : (
                <ListNum>토론 {debates.length}개</ListNum>
              )}

              {debates.map((debate, index) => (
                <div key={index}>
                  <SentenceBox></SentenceBox>
                  <BoxContainer>
                    <DebateBox debate={debate}></DebateBox>
                  </BoxContainer>
                </div>
              ))}
            </ListContatiner>
            <CreateButton src={addBtn} onClick={openModal}></CreateButton>
            {isModalOpen && (
              <DebateCreateModal
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                debateTitle={debateTitle}
                setDebateTitle={setDebateTitle}
                participants={participants}
                handleParticipantChange={handleParticipantChange}
              ></DebateCreateModal>
            )}
          </>
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
