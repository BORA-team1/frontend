import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
//img
import articlebackground from '../images/articlebackground.png';
import closebutton from '../images/closebutton.svg';
import more from '../images/more.svg';
import info from '../images/info.svg';
//component
import InputBox from '../components/DebatePage/InputBox';
import DebateMessage from '../components/DebatePage/DebateMessage';
import GroupSettingModal from '../components/DebatePage/GroupSettingModal';
import DebateEnd from '../components/DebatePage/DebateEnd';

const DebatePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(true);

  //입력값 관련 코드
  const [showDebateEnd, setShowDebateEnd] = useState(false);
  const [debateText, setDebateText] = useState('');
  const [submissions, setSubmissions] = useState([]);

  //--//날짜 관련
  const [time, setTime] = useState('00:00');
  const currentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  };

  const handleInputChange = (inputValue) => {
    if (inputValue.trim() === '#토론종료') {
      setShowDebateEnd(true);
    } else {
      setDebateText(inputValue); //input text 설정
      setSubmissions([...submissions, inputValue]);
    }
    currentTime();
  };
  return (
    <Wrapper>
      <BackgroundImg>
        <img src={articlebackground} alt='포스트 배경 이미지'></img>
      </BackgroundImg>
      <GradientOverlay></GradientOverlay>
      <Header>
        <Top>
          <CloseButton
            src={closebutton}
            alt='closebutton'
            onClick={() => {
              navigate(-1);
            }}
          ></CloseButton>
          <Quoting>
            인용하기<img src={more} alt='morereview'></img>
          </Quoting>
        </Top>
        <Mid>
          <div>6명 토론중</div>
          <Title>아스파탐 같은 인공감미료는 정말 괜찮을까?</Title>
        </Mid>
        <Bot>
          <span>찬성 측 발언 중</span>
          <span>반대 측 발언 중</span>
        </Bot>
      </Header>

      <Container>
        <HeaderText>
          <span>broaden_horizons</span> 님이 발언할 순서입니다.
        </HeaderText>
        <HR></HR>
        <Information>
          <img src={info} alt='info'></img>
          <div>
            토론 종료는 채팅창에 <span>‘#토론종료’</span> 라고 입력해 주세요.
            <br></br>
            후에 생성된 토론 종료 버튼을 참여자들이 모두 클릭하면 종료됩니다.
          </div>
        </Information>
        <Chatting>
          {submissions.map((message, index) => (
            <MessageBox>
              <DebateMessage
                key={index}
                user='도라에몽'
                text={message}
                time={time}
              />
            </MessageBox>
          ))}

          {showDebateEnd && <DebateEnd />}
        </Chatting>
        <InputBoxPosition>
          {/* <SelectedSentence>
            <div>
              <span>인용하기</span>
              <div>
                “ 혹시 요즘 아스파탐 논란 보고혹시 요즘 아스파탐 논란 보고
                ‘제로슈거 음료 안 마시는 게 낫나?’ 고민한 사람 있나요? ”
              </div>
            </div>
            <img src={closebutton} alt='closebutton'></img>
          </SelectedSentence> */}
          <InputBox onInputChange={handleInputChange} />
        </InputBoxPosition>
      </Container>
      {isModalOpen && <GroupSettingModal setModalOpen={setModalOpen} />}
    </Wrapper>
  );
};

export default DebatePage;

const Wrapper = styled.div`
  z-index: 1;
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  color: #fff;
  margin: 0px auto;
`;

const BackgroundImg = styled.div`
  top: 0;
  width: 390px;
  height: 270px;
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 390px;
  height: 270px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
`;

const Header = styled.div`
  z-index: 1;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 57px 20px 20px 20px;
  box-sizing: border-box;
`;

const CloseButton = styled.img`
  width: 29px;
  height: 29px;
  cursor: pointer;
`;

const Quoting = styled.div`
  padding: 7px 14px;
  border-radius: 20px;
  border: 1.2px solid #fff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

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

const Mid = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  gap: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.24px;
`;

const Title = styled.div`
  width: 255px;
  height: 66px;
  text-align: center;
  font-size: 24px;
  line-height: 136.5%; /* 32.76px */
  letter-spacing: -0.48px;
`;

const Bot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;

  span {
    color: rgba(255, 255, 255, 0.6);
    width: 195px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 136.5%;
    letter-spacing: -0.32px;
  }
`;

const Container = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  padding: 20px;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;

  span {
    font-weight: 600;
    margin-right: 3px;
  }
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;

const Information = styled.div`
  width: 350px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);

  img {
    margin: 15px;
  }

  div {
    color: var(--main-black, #1a1920);
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
  }

  div > span {
    color: #5a45f5;
  }
`;

const Chatting = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
  width: 360px;
  height: 450px;
  white-space: nowrap;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  //내 메시지 보여주려고 임시로 지정함.
  //나중에 내 메시지인지 상대방 메시지인지 구분해서 포지션 정하기
  align-items: flex-end;
`;

const MessageBox = styled.div`
  border-radius: 15px;
  background: var(--main-purple, #5a45f5);
  margin-top: 15px;
`;

const InputBoxPosition = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
  border-top: 1px solid #353646;
  background: var(--background, #161524);
  position: fixed;
  bottom: 0;
`;

const SelectedSentence = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin-top: -6px;
  margin-bottom: 12px;

  div {
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    line-height: 133.5%; /* 13.35px */
    letter-spacing: -0.2px;
  }

  div > span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 9px;
    font-weight: 600;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const DebateEndContainer = styled.div`
  position: absolute;
  bottom: 285;
  right: 15;
  text-align: center;
`;
