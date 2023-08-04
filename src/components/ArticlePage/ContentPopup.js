import React, {useState} from 'react';
import styled from 'styled-components';
import VoteResult from './VoteResult';
import DebateNow from './DebateNow';

const ContentPopup = () => {
  const [isPopupOpen, setPopupOpen] = useState(true);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Container>
      {/* 접고 피는 버튼 아직X */}
      <Sentence>
        “킬러 문항을 없앤다고 수능 사교육이 줄어들진 않는다는 거예요.”
      </Sentence>
      <ContentContainer>
        {/* <VoteResult></VoteResult> */}
        <DebateNow></DebateNow>
      </ContentContainer>
    </Container>
  );
};

export default ContentPopup;

const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 390px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Sentence = styled.div`
  padding: 20px 43px 20px 36px;
  box-sizing: border-box;
  background: #3f405b;
  font-size: 12px;
  font-weight: 600;
  line-height: 151.336%;
`;

const ContentContainer = styled.div`
  padding-top: 13px;
  padding-bottom: 20px;
  padding-left: 36px;
  box-sizing: border-box;
  background: #2b2c3f;
`;
