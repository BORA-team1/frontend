//위로 원래 모달

import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

//img
import warningIcon from '../../images/Audiobook/warningIcon.svg';
import explanation from '../../images/Audiobook/explanation_playlist.svg';
import guidebtn from '../../images/Audiobook/guidebtn.svg';
import okbtn from '../../images/Audiobook/okbtn.svg';

const WarningModal = ({openWarningModal, closeWarningModal}) => {
  const navigate = useNavigate();
  const navigatorG = () => {
    navigate('/guidebookpage');
  };

  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      // 클릭 이벤트가 Container 영역 밖인 경우에만 모달 닫기
      closeWarningModal();
    }
  };
  if (!openWarningModal) return null;
  return (
    <>
      <Wrapper>
        <Container ref={containerRef} onClick={handleClickOutside}>
          <Title src={warningIcon} />
          <Explanation src={explanation} />
          <BtnBox>
            <GuideBtn src={guidebtn} onClick={navigatorG} />
            <OKBtn src={okbtn} onClick={closeWarningModal} />
          </BtnBox>
        </Container>
      </Wrapper>
    </>
  );
};

export default WarningModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: absolute;
  top: 180px;
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;

  border-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  background: #161524;
  box-sizing: border-box;
`;

const Title = styled.img`
  margin-top: -27px;
`;

const Explanation = styled.img`
  margin-top: 11px;
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
