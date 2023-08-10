import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import more from '../../images/more.svg';
import QuoteBottomSheet from './QuoteBottomSheet';

const VoteCreateModal = ({
  closeModal,
  handleSubmit,
  voteTitle,
  setVoteTitle,
  options,
  handleOptionChange,
}) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  //인용 바텀시트 띄우기
  const openBottomSheet = () => {
    setBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  const textRef = useRef();
  const handleResizeHeight = () => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  };

  return (
    <Wrapper onClick={closeModal}>
      <CreateButton
        onClick={(e) => {
          e.stopPropagation();
          handleSubmit();
        }}
      >
        등록
      </CreateButton>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>투표</Title>
        <TextInput>
          <textarea
            ref={textRef}
            onInput={handleResizeHeight}
            value={voteTitle}
            onChange={(e) => setVoteTitle(e.target.value)}
            placeholder='질문을 입력해 주세요.'
            rows={1}
            maxlength='72'
          ></textarea>
        </TextInput>
        <ListInput>
          {options.map((option, index) => (
            <input
              key={index}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder='항목을 입력해 주세요.'
            ></input>
          ))}
        </ListInput>
        <Quoting id='quote' onClick={openBottomSheet}>
          인용하기<img src={more} alt='인용하기'></img>
        </Quoting>
        {bottomSheetOpen && (
          <QuoteBottomSheet
            closeBottomSheet={closeBottomSheet}
          ></QuoteBottomSheet>
        )}
      </Container>
    </Wrapper>
  );
};

export default VoteCreateModal;

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Container = styled.div`
  position: absolute;
  top: 180px;
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  background: #161524;
  box-sizing: border-box;
`;

const TextInput = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;

  textarea {
    max-height: 190px;
    background: none;
    border: none;
    outline: none;
    resize: none;
    text-align: center;
    color: #fff;
    font-family: 'Pretendard-Regular';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 136.5%; /* 27.3px */
    letter-spacing: -0.4px;
  }
`;

const ListInput = styled.div`
  width: 300px;
  height: 238px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2b2c3f;
  gap: 23px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  input {
    width: 260px;
    height: 50px;
    border-radius: 10px;
    background: #6a6881;
    border: none;
    outline: none;
    padding-left: 15px;
    box-sizing: border-box;
    color: #fff;
    font-family: 'Pretendard-Regular';
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 136.5%; /* 17.745px */
    letter-spacing: -0.26px;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const CreateButton = styled.div`
  position: absolute;
  top: 76px;
  right: 20px;
  color: rgba(255, 255, 255, 0.7);

  font-size: 18px;
  font-weight: 500;
  line-height: 136.5%; /* 24.57px */
  letter-spacing: -0.36px;
  text-decoration-line: underline;
  cursor: pointer;
`;

const Quoting = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  padding: 7px 14px;
  border-radius: 20px;
  border: 1.2px solid #fff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: #fff;

  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;

  img {
    width: 6px;
    height: 11px;
    margin-left: 5px;
  }
`;

const Title = styled.div`
  margin-top: -20px;
  padding: 10px 20px;
  border-radius: 20px;
  background: var(--main-purple, #5a45f5);

  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;
