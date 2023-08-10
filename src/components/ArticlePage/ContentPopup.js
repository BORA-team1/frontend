import React, {useState} from 'react';
import styled from 'styled-components';
import VoteResult from './VoteResult';
import DebateNow from './DebateNow';
import more from '../../images/more.svg';

const ContentPopup = () => {
  const [isOpen, setOpen] = useState('true');

  const handlePopup = () => {
    setOpen(!isOpen);
  };

  return (
    <Container>
      <Triangle></Triangle>
      <Sentence>
        “킬러 문항을 없앤다고 수능 사교육이 줄어들진 않는다는 거예요.”
      </Sentence>
      {isOpen && (
        <ContentContainer>
          <VoteResult></VoteResult>
          {/* <DebateNow></DebateNow> */}
        </ContentContainer>
      )}
      <Popup onClick={handlePopup} isopen={isOpen}>
        <img src={more} alt='popupbutton'></img>
      </Popup>
    </Container>
  );
};

export default ContentPopup;

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  width: 390px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Triangle = styled.div`
  margin-top: -10px;
  margin-left: 30px;
  width: 35px;
  height: 35px;
  background-color: #3f405b;
  border-radius: 0.5rem;
  clip-path: polygon(0% 0%, 100% 100%, 100% 0%);
  position: absolute;
  transform: rotate(-45deg);
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
  background: ${(props) => (props.isopen ? '#2b2c3f' : '#3f405b')};
  display: flex;
  justify-content: center;

  img {
    margin-top: 8px;
    transform: rotate(90deg);
  }
`;
