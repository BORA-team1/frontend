import styled from 'styled-components';

const DabateBox = ({debate, nickname, BASE_URL, handleDebateComplete}) => {
  return (
    <Box>
      <Title>
        {'<'}
        {debate.title}
        {'>'}
      </Title>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '350px',
        }}
      >
        <TagBox>
          <People>만든 이</People>
          <UserIcon>
            <img src={`${BASE_URL}${debate.debate_user.profile}`} />
            <div>{debate.debate_user.nickname}</div>
          </UserIcon>
        </TagBox>
        <BtnContainer>
          <JoinBtn onClick={() => (window.location.href = debate.url)}>
            참여하기
          </JoinBtn>
          {debate.debate_user.nickname === nickname && (
            <JoinBtn
              onClick={() => {
                handleDebateComplete(debate.debate_id);
              }}
              style={{background: 'none', color: 'white'}}
            >
              토론 종료하기
            </JoinBtn>
          )}
        </BtnContainer>
      </div>
    </Box>
  );
};

export default DabateBox;

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

const UserIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.83px;

  img {
    width: 26.9px;
    height: 26.9px;
    border-radius: 50%;
  }

  div {
    font-size: 6.113px;
    font-weight: 600;
    line-height: normal;
  }
`;

const People = styled(Font)`
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const JoinBtn = styled(Font)`
  display: flex;
  align-items: flex-start;
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid #fff;
  background: #fff;
  cursor: pointer;

  color: var(--main-black, #1a1920);
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;
