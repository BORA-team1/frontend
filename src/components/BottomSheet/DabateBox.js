import styled from 'styled-components';
//img
import usericon from '../../images/willbedeleted/UserIcon.svg';

const DateBox = ({debate}) => {
  return (
    <Box>
      <Title>"{debate.title}"</Title>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '350px',
        }}
      >
        <TagBox>
          <UserIcon src={usericon} />
          <People>모집중/{debate.participants}명</People>
        </TagBox>
        <JoinBtn>참여하기</JoinBtn>
      </div>
    </Box>
  );
};

export default DateBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  height: 64.7px;
`;

const Font = styled.div`
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Title = styled(Font)`
  width: 350px;
  height: 23px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14.989px;
  font-weight: 400;

  margin-bottom: 5px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const UserIcon = styled.img`
  width: 26.897px;
  height: 36.677px;
`;

const People = styled(Font)`
  font-size: 12px;
  font-weight: 600;

  margin-left: 8px;
`;

const JoinBtn = styled(Font)`
  display: flex;
  align-items: flex-start;
  padding: 7px 14px;
  border-radius: 20px;
  background: #fff;

  color: var(--main-black, #1a1920);
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;
