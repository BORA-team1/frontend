import React, {useState} from 'react';
import styled from 'styled-components';
import VoteResult from './VoteResult';
import DebateNow from './DebateNow';

const ContentPopup = () => {
  const [isPopupOpen, setPopupOpen] = useState(true);

  const handlePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <Container>
      {/* 화살표 추가하기 */}
      <Sentence>
        “킬러 문항을 없앤다고 수능 사교육이 줄어들진 않는다는 거예요.”
      </Sentence>
      {isPopupOpen && (
        <ContentContainer>
          {/* <VoteResult></VoteResult> */}
          <DebateNow></DebateNow>
        </ContentContainer>
      )}
      <Popup onClick={handlePopup} isPopupOpen={isPopupOpen}></Popup>
    </Container>
  );
};

export default ContentPopup;

const Container = styled.div`
  margin-top: -35px;
  margin-bottom: -20px;
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

const Popup = styled.div`
  margin-top: -10px;
  margin-left: 315px;
  width: 27px;
  height: 19px;
  border-radius: 5px;
  background: ${(props) => (props.isPopupOpen ? '#2b2c3f' : '#3f405b')};
`;
