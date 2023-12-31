//위로 원래 모달

import React, {useRef} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

//img
import checkedIcon from '../../images/Audiobook/checkedIcon.svg';
import explanation from '../../images/Audiobook/explanation_playlistconplete.svg';
import mypagebtn from '../../images/Audiobook/mypageBtn.svg';
import okbtn from '../../images/Audiobook/okbtn.svg';

const PlaylistCompleteModal = ({handleCloseCompleteModal}) => {
  const navigate = useNavigate();
  const navigatorM = () => {
    navigate('/mypage');
  };

  const containerRef = useRef(null);

  return (
    <>
      <Wrapper>
        <Container ref={containerRef}>
          <Title src={checkedIcon} />
          <Explanation src={explanation} />
          <BtnBox>
            <GuideBtn src={mypagebtn} onClick={navigatorM} />
            <OKBtn src={okbtn} onClick={handleCloseCompleteModal} />
          </BtnBox>
        </Container>
      </Wrapper>
    </>
  );
};

export default PlaylistCompleteModal;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
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
  width: 54px;
  height: 54px;
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
