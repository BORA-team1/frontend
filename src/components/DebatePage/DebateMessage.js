import React, { useState } from "react";
import styled from "styled-components";

const DebateMessage = ({ user, text, time }) => {
  const [quoting, setQuoting] = useState(false); //나중에 전달하면서 사용! 인용문 있을 경우
  const pickQuoting = () => {
    setQuoting(!quoting);
  };

  return (
    <>
      {text ? (
        <Box>
          {quoting ? (
            <Quotation>
              "혹시 요즘 아스파탐 논란 보고 고민한 사람 있나요? 어쩌구 저쩌구
              여기는 컴포넌트나 여튼 텍스트를 받아올 거예요
            </Quotation>
          ) : null}
          <Text>{text}</Text>
          <Info>
            <UserName>{user}</UserName>
            <Time>{time}</Time>
            {user === "안내" ? null : <Part>찬성</Part>}
            {/* 찬성 반대도 나중에 로직으로 정리를 좀 해야 할 듯 */}
          </Info>
        </Box>
      ) : null}
      {/* <button onClick={currentTime}>Receive Signal</button> */}
      {/* 얘는 잘 작동하는 거 보여주려고 만든 거고 
            나중에는 submit 신호 오면 그 때 시간 가는 식으로 하면 될 듯 */}
    </>
  );
};

export default DebateMessage;

const Box = styled.div`
  width: 187px;
  padding: 15px 12px;
  border-radius: 15px;
`;

const Font = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.22px;
`;

const Quotation = styled(Font)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 500;
`;

const Text = styled(Font)`
  font-size: 13px;
  font-weight: 500;

  width: 187px;
  white-space: normal;

  margin-top: 8px;
  margin-bottom: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserName = styled(Font)`
  font-size: 10px;
  font-weight: 600;
`;

const Time = styled(Font)`
  font-size: 9px;
  font-weight: 400;

  margin: 0px 8px;
`;

const Part = styled(Font)`
  font-size: 9px;
  font-weight: 400;
`;
