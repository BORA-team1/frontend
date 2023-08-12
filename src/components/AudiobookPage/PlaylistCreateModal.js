//위로 원래 모달

import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

//img
import guidebtn from '../../images/Audiobook/guidebtn.svg';
import createbtn from '../../images/Audiobook/createbtn.svg';

const PlaylistCreateModal = ({closeCreateModal, handleOpenCompleteModal}) => {
  const navigate = useNavigate();
  const navigatorG = () => {
    navigate('/guidebookpage');
  };
  //input 입력창
  // 두 개의 입력 창에 초기값 설정
  const [title, setTitle] = useState(''); // 첫 번째 입력창의 값
  const [description, setDescription] = useState(''); // 두 번째 입력창의 값

  // 첫 번째 입력창 값 변경 이벤트 핸들러
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 두 번째 입력창 값 변경 이벤트 핸들러
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  //완료 모달
  // const handleSubmit = () => {
  //     closeCreateModal(); // Close the CreateModal
  //     handleOpenCompleteModal(); // Open the PlaylistCompleteModal
  // };
  // const [completeModal, setCompleteModal] = useState(false);

  // const handleSubmit = () => {
  //     setCompleteModal(true);
  // };

  // const closeCompleteModal = () => {
  //     setCompleteModal(false);
  // };

  return (
    <>
      <Wrapper>
        <Container>
          <Title>새 재생목록 생성</Title>
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder='제목을 입력하세요'
          />
          <Input
            value={description}
            onChange={handleDescriptionChange}
            placeholder='추가설명을 입력하세요'
          />
          <BtnBox>
            <GuideBtn src={guidebtn} onClick={navigatorG} />
            <OKBtn
              src={createbtn}
              onClick={() => {
                closeCreateModal();
                handleOpenCompleteModal();
              }}
            />
          </BtnBox>
        </Container>
      </Wrapper>
    </>
  );
};

export default PlaylistCreateModal;

const Wrapper = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: absolute;
  top: 180px;
  width: 300px;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;

  border-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  background: #161524;
  box-sizing: border-box;
`;

const Title = styled.div`
  margin-top: -20px;
  padding: 10px 20px;
  border-radius: 20px;
  background: var(--main-purple, #5a45f5);

  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Input = styled.input`
  margin-top: 30px;
  background-color: transparent;
  outline: none;
  border-width: 0 0 0.7px;
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
  text-align: center;

  font-family: 'Pretendard-Regular';

  &.empty {
    /* 입력되지 않았을 때의 스타일 */
    border-color: var(--on-red, #ff5e2b);

    &::placeholder {
      color: var(--on-red, #ff5e2b);
    }
  }

  &:focus {
    /* 입력 중일 때의 스타일 */
    border-color: #5a45f5;
  }
  &::placeholder {
    color: (255, 255, 255, 0.5);
  }
`;

const BtnBox = styled.div`
  margin: 20px 20px;
  display: flex;
`;

const GuideBtn = styled.img`
  cursor: pointer;
`;

const OKBtn = styled.img`
  cursor: pointer;
  margin-left: 20px;
`;
