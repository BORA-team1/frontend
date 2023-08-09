import React, {useState} from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';
import votedicon from '../../images/votedicon.svg';

const VoteBox = ({vote}) => {
  const [votedIndex, setVotedIndex] = useState(-1); // 투표된 항목의 인덱스

  // 투표 처리 함수
  const handleVote = (index) => {
    setVotedIndex(index);
  };

  return (
    <Container>
      <Header>
        <ProfileContainer>
          <img src={profile} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>broaden_horizons</Id>
          <Content>{vote.title}</Content>
        </ContentContainer>
      </Header>
      <List>
        {vote.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleVote(index)}
            style={{
              backgroundColor: votedIndex === index ? '#5A45F5' : '#6a6881',
            }}
          >
            {option}
            {votedIndex === index && (
              <CheckCircle src={votedicon} alt='투표 완료'></CheckCircle>
            )}
          </div>
        ))}
      </List>
    </Container>
  );
};

export default VoteBox;

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 17px;
`;

const ProfileContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  width: 296px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Id = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  margin-top: 5px;
  font-size: 14.989px;
  font-weight: 400;
  line-height: 135.836%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 23px;

  div {
    width: 350px;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 16px 20px 16px 20px;
    box-sizing: border-box;
    font-size: 13px;
    font-weight: 600;
    line-height: 136.5%; /* 17.745px */
    letter-spacing: -0.26px;
  }
`;

const CheckCircle = styled.img`
  position: absolute;
  right: 40px;
`;
