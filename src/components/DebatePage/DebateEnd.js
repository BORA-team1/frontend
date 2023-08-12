import styled from "styled-components";

import ending_btn from "../../images/Debate/ending_btn.svg";

const DebateEnd = () => {
  return (
    <Box>
      <Title>#토론종료</Title>

      <Tag>
        토론 종료에 동의하신다면 아래 버튼을 눌러주세요. <br /> 모든 참여자들이
        버튼을 클릭하면 자동으로 종료됩니다.
      </Tag>
      <EndingBtn src={ending_btn} />
    </Box>
  );
};

export default DebateEnd;

const Box = styled.div`
  display: flex;
  width: 235px;
  padding: 15px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 200px;

  border-radius: 15px;
  background: var(--card-color, #2b2c3f);
`;

const Font = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.22px;
`;

const Title = styled(Font)`
  color: var(--sub-purple, #a397ff);
  font-size: 13px;
  font-weight: 500;
`;

const Tag = styled(Font)`
  font-size: 10px;
  font-weight: 400;
`;

const EndingBtn = styled.img`
  width: 211px;
  height: 37px;
`;
