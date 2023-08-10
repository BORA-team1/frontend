import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import addbutton from '../../images/addbutton.png';
import VoteCreateModal from './VoteCreateModal';
import SentenceBox from './SentenceBox';
import VoteBox from './VoteBox';
import VoteResult from '../ArticlePage/VoteResult';

const VoteBottomSheet = ({handleCloseBottomSheet}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState('A');
  const [voteTitle, setVoteTitle] = useState(''); //투표 타이틀
  const [options, setOptions] = useState(['', '', '']); //투표 항목 3개
  const [votes, setVotes] = useState([]); // 생성된 투표가 저장되는 배열
  const [completedVoteList, setCompletedVoteList] = useState([]); // 완료된 투표가 저장되는 배열

  //투표 생성 모달 띄우기
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //카테고리
  const showListA = () => setCategory('A');
  const showListB = () => setCategory('B');
  const showListC = () => setCategory('C');

  // 항목 입력 변경 이벤트 처리
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // 모달에서 등록 버튼을 눌렀을 때 실행되는 함수 (투표 생성)
  const handleSubmit = () => {
    closeModal();

    // 투표 항목 저장 로직 추가
    const newVote = {
      title: voteTitle,
      options: options,
    };

    // 투표 리스트에 추가
    setVotes([...votes, newVote]);

    // 저장 후 초기화
    setVoteTitle('');
    setOptions(['', '', '']);
  };

  //투표 종료하기
  const handleVoteComplete = (index) => () => {
    const completedVote = votes.splice(index, 1)[0];
    setVotes([...votes]);
    setCompletedVoteList([...completedVoteList, completedVote]);
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

        {/* 카테고리 별 리스트*/}
        {category === 'A' && (
          <>
            <ListContatiner>
              {votes.length === 0 ? (
                <ListNum>아직 생성된 투표가 없습니다.</ListNum>
              ) : (
                <ListNum>투표 {votes.length}개</ListNum>
              )}

              {votes.map((vote, index) => (
                <div key={index}>
                  <SentenceBox></SentenceBox>
                  <VoteBoxContainer>
                    <VoteBox
                      vote={vote}
                      handleVoteComplete={handleVoteComplete}
                    ></VoteBox>
                    <VoteEnd onClick={handleVoteComplete(vote.index)}>
                      투표 종료하기
                    </VoteEnd>
                  </VoteBoxContainer>
                </div>
              ))}
            </ListContatiner>
            <CreateButton src={addbutton} onClick={openModal}></CreateButton>
            {isModalOpen && (
              <VoteCreateModal
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                voteTitle={voteTitle}
                setVoteTitle={setVoteTitle}
                options={options}
                handleOptionChange={handleOptionChange}
              ></VoteCreateModal>
            )}
          </>
        )}
        {category === 'B' && (
          <>
            <ListContatiner>
              <ListNum>투표 1개</ListNum>
              <SentenceBox></SentenceBox>
              <VoteResultContainer>
                <VoteResult></VoteResult>
              </VoteResultContainer>
            </ListContatiner>
          </>
        )}
        {category === 'C' && (
          <>
            <ListContatiner>
              <ListNum>아직 생성된 투표가 없습니다.</ListNum>
              {votes.map((vote, index) => (
                <div key={index}>
                  <SentenceBox></SentenceBox>
                  <VoteBoxContainer>
                    <VoteBox vote={vote}></VoteBox>
                  </VoteBoxContainer>
                </div>
              ))}
            </ListContatiner>
          </>
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
  backdrop-filter: blur(5px);
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
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
