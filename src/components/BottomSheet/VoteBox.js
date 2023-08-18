import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//images
import votedicon from '../../images/votedicon.svg';

//context
import {useAuth} from '../../contexts/AuthContext';

const VoteBox = ({ingvote}) => {
  const {authToken, BASE_URL} = useAuth();
  const [votedIndex, setVotedIndex] = useState(
    ingvote.my_select !== 0 ? ingvote.my_select : -1
  );

  const handleVote = (index) => {
    {
      votedIndex === -1 &&
        axios
          .post(
            `${BASE_URL}vote/voting/${ingvote.vote_id}/`,
            {select: index},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((response) => {
            setVotedIndex(index);
            console.log(response);
          })
          .catch((error) => {
            console.error('투표하는 중 오류가 발생했습니다.', error);
          });
    }
  };

  return (
    <Container>
      <Header>
        <ProfileContainer>
          <img src={`${ingvote.vote_user.profile}`} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>{ingvote.vote_user.nickname}</Id>
          <Content>{ingvote.title}</Content>
        </ContentContainer>
      </Header>
      <List>
        <div
          onClick={() => handleVote(1)}
          style={{
            backgroundColor: votedIndex === 1 ? '#5A45F5' : '#6a6881',
          }}
        >
          {ingvote.item1}
          {votedIndex === 1 && <img src={votedicon} alt='투표 완료'></img>}
        </div>
        <div
          onClick={() => handleVote(2)}
          style={{
            backgroundColor: votedIndex === 2 ? '#5A45F5' : '#6a6881',
          }}
        >
          {ingvote.item2}
          {votedIndex === 2 && <img src={votedicon} alt='투표 완료'></img>}
        </div>
        <div
          onClick={() => handleVote(3)}
          style={{
            backgroundColor: votedIndex === 3 ? '#5A45F5' : '#6a6881',
          }}
        >
          {ingvote.item3}
          {votedIndex === 3 && <img src={votedicon} alt='투표 완료'></img>}
        </div>
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
    width: 42px;
    height: 42px;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
