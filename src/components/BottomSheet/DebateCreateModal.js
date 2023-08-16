import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import QuoteBottomSheet from './QuoteBottomSheet';
import more from '../../images/more.svg';

//context
import {useAuth} from '../../contexts/AuthContext';

const DebateCreateModal = ({closeModal, postPk, render, setRender}) => {
  //인용 바텀시트 띄우기
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const openBottomSheet = () => {
    setBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  //인용 문장 id 저장
  const [lineId, setLineId] = useState(null);

  //POST: 투표 등록
  const {authToken, BASE_URL} = useAuth();
  const [debateTitle, setDebateTitle] = useState(''); //토론 타이틀
  const [debateLink, setDebateLink] = useState(null);

  const handleSubmit = (lineId) => {
    if (debateTitle.trim() === '') return null;
    axios
      .post(
        `${BASE_URL}debate/${postPk}/`,
        {
          title: debateTitle,
          link: debateLink,
          debate_line: lineId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        closeModal();
        setDebateTitle('');
        setDebateLink(null);
        setLineId(null);
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('투표를 등록하는 중 오류가 발생했습니다.', error);
      });
  };

  //GET: 내 밑줄
  useEffect(() => {
    getLine();
  }, []);

  const [line, setLine] = useState([]);
  const getLine = () => {
    axios
      .get(`${BASE_URL}line/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setLine(response.data.data.Lines);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('인용할 문장을 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  const targetLine = line.find((line) => line.line_id === lineId);

  return (
    <Wrapper onClick={closeModal}>
      <CreateButton
        onClick={(e) => {
          e.stopPropagation();
          handleSubmit(lineId);
        }}
      >
        등록
      </CreateButton>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>토론</Title>
        <div
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Q>1. 토론 주제는 무엇인가요?</Q>
          <Theme
            value={debateTitle}
            onChange={(e) => setDebateTitle(e.target.value)}
            placeholder='주제를 입력해 주세요'
          />
          <Q>2. 토론을 진행할 오픈채팅방 링크를 입력해 주세요.</Q>
          <Theme
            value={debateLink}
            onChange={(e) => setDebateLink(e.target.value)}
            placeholder='링크를 복사해 붙여 넣어 주세요.'
          />
        </div>
        {lineId ? (
          <Quoting style={{fontWeight: '400', fontSize: '12px'}}>
            " {targetLine.content} "
          </Quoting>
        ) : (
          <Quoting onClick={openBottomSheet}>
            인용하기<img src={more} alt='인용하기'></img>
          </Quoting>
        )}
        {bottomSheetOpen && (
          <QuoteBottomSheet
            closeBottomSheet={closeBottomSheet}
            line={line}
            setLineId={setLineId}
          ></QuoteBottomSheet>
        )}
      </Container>
    </Wrapper>
  );
};

export default DebateCreateModal;

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

const Q = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  line-height: 136.5%; /* 20.475px */
  letter-spacing: -0.3px;

  margin-top: 20px;
  margin-bottom: 10px;
`;

const Theme = styled.input`
  width: 260px;
  height: 50px;
  border-radius: 10px;
  background: #6a6881;

  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  text-indent: 15px;

  outline: none;
  border: none;

  .input::placeholder {
    color: (255, 255, 255, 0.5);
  }
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
