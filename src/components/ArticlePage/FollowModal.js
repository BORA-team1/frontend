import React from 'react';
import styled from 'styled-components';

//img
import checkedIcon from '../../images/Audiobook/checkedIcon.svg';

const WarningModal = ({closeWarningModal}) => {
  return (
    <>
      <Wrapper onClick={closeWarningModal}>
        <Container onClick={(e) => e.stopPropagation()}>
          <Title src={checkedIcon} />
          <Content>에디터 팔로우를 완료했습니다!</Content>
          <BtnBox>
            <CloseBtn onClick={closeWarningModal}>닫기</CloseBtn>
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

const Content = styled.div`
  margin-top: 17px;
  color: #fff;
  font-size: 15px;
  font-weight: 300;
  line-height: 169.336%;
`;

const BtnBox = styled.div`
  margin: 20px 20px;
  display: flex;
`;

const CloseBtn = styled.div`
  width: 120px;
  padding: 8px 13px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background: var(--main-purple, #5a45f5);
  cursor: pointer;
`;
