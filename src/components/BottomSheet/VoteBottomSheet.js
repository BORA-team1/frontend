import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import addbutton from '../../images/addbutton.png';
import VoteCreateModal from './VoteCreateModal';

const VoteBottomSheet = ({handleCloseBottomSheet}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState('A');

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');

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
            <span>투표</span>
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
                내가만든
              </span>
            </div>
          </Category>
          <Bar style={{left: barPosition[category]}} />
        </BottomSheetHeader>

        {/* 카테고리에 맞는 리스트가 뜨게끔 추후에 수정할 예정 */}
        <ReviewContatiner>
          <ReviewsTop>아직 생성된 투표가 없습니다.</ReviewsTop>
        </ReviewContatiner>
        <CreateButton src={addbutton} onClick={openModal}></CreateButton>
        {isModalOpen && (
          <VoteCreateModal closeModal={closeModal}></VoteCreateModal>
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

const ReviewContatiner = styled.div`
  margin-top: 125px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const ReviewsTop = styled.div`
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

const CreateButton = styled.img`
  position: absolute;
  right: 20px;
  bottom: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
`;
