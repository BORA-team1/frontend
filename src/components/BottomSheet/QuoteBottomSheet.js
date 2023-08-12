import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import Quotation from './Quotation';
import axios from 'axios';

const QuoteBottomSheet = ({closeBottomSheet}) => {
  const BASE_URL = 'http://localhost:3001/';

  //밑줄 Get
  const [lines, setLines] = useState([]);
  useEffect(() => {
    const getLines = async () => {
      try {
        const response = await axios.get(`${BASE_URL}line`);
        setLines(response.data.Lines);
      } catch (error) {
        console.error('밑줄을 불러오는 중 오류가 발생했습니다.', error);
      }
    };

    getLines();
  }, []);

  return (
    <BottomSheetOverlay>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={closeBottomSheet}>닫기</CloseBottomSheet>
            <span>밑줄</span>
          </HeaderText>
          <HR></HR>
        </BottomSheetHeader>

        <List>
          <Num>문장 {lines.length}개</Num>
          {lines.map((line) => (
            <Quotation
              key={line.line_id}
              lineContent={line.content}
              closeBottomSheet={closeBottomSheet}
            ></Quotation>
          ))}
        </List>
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default QuoteBottomSheet;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheetOverlay = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BottomSheetContainer = styled.div`
  width: 100%;
  height: 780px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;

  font-family: 'Pretendard-Regular';
  font-style: normal;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideUp} 0.3s ease-in-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-size: 15px;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;

  background: var(--background, #161524);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;

  span {
    color: #fff;
    font-weight: 600;
  }
`;

const CloseBottomSheet = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-right: 129px;
  cursor: pointer;
`;

const List = styled.div`
  margin-top: 75px;
  margin-bottom: 77px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const Num = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const HR = styled.div`
  width: 390px;
  height: 1px;
  background: rgba(53, 54, 70, 0.3);
`;
