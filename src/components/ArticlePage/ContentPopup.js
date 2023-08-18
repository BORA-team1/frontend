import React, {useState} from 'react';
import styled from 'styled-components';
import VoteResult from './VoteResult';
import DebateNow from './DebateNow';
import more from '../../images/more.svg';

const ContentPopup = ({line, lineContent, onHover, offHover}) => {
  const [isVoteOpen, setVoteOpen] = useState('true');
  const handleVotePopup = () => {
    setVoteOpen(!isVoteOpen);
  };

  const [isDebateOpen, setDebateOpen] = useState('true');
  const handleDebatePopup = () => {
    setDebateOpen(!isDebateOpen);
  };

  const [isHoveredV, setHoveredV] = useState(false);
  const [isHoveredD, setHoveredD] = useState(false);

  return (
    <>
      {line.DoneVote && line.DoneVote.length > 0 ? (
        <Container>
          <Triangle></Triangle>
          <Sentence>
            <div
              onMouseEnter={() => {
                onHover(lineContent);
                setHoveredV(true);
              }}
              onMouseLeave={() => {
                offHover();
                setHoveredV(false);
              }}
              style={{
                color: isHoveredV ? '#A397FF' : 'white',
              }}
            >
              “{lineContent}”
            </div>
          </Sentence>
          {isVoteOpen &&
            line.DoneVote.map((donevote) => (
              <ContentContainer>
                <VoteResult
                  // user={donevote.vote_user}
                  donevote={donevote}
                ></VoteResult>
              </ContentContainer>
            ))}
          <Popup onClick={handleVotePopup} isopen={isVoteOpen}>
            <img src={more} alt='popupbutton'></img>
          </Popup>
        </Container>
      ) : null}
      {line.Debate &&
        line.Debate.length > 0 &&
        line.Debate.map(
          (debate, index) =>
            debate.cond === 1 && (
              <Container key={index}>
                <Triangle></Triangle>
                <Sentence>
                  <div
                    onMouseEnter={() => {
                      onHover(lineContent);
                      setHoveredD(true);
                    }}
                    onMouseLeave={() => {
                      offHover();
                      setHoveredD(false);
                    }}
                    style={{
                      color: isHoveredD ? '#A397FF' : 'white',
                    }}
                  >
                    “{lineContent}”
                  </div>
                </Sentence>
                {isDebateOpen && (
                  <ContentContainer>
                    <DebateNow debate={debate}></DebateNow>
                  </ContentContainer>
                )}
                <Popup onClick={handleDebatePopup} isopen={isDebateOpen}>
                  <img src={more} alt='popupbutton'></img>
                </Popup>
              </Container>
            )
        )}
    </>
  );
};

export default ContentPopup;

const Container = styled.div`
  margin-top: -20px;
  margin-bottom: 40px;
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
