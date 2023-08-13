import React from 'react';
import styled from 'styled-components';

import profile from '../../images/profile.svg';

const Editer = ({editer}) => {
  return (
    <Profile>
      <img src={profile}></img>
      <span>{editer.nickname}</span>
    </Profile>
  );
};

export default Editer;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 39px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 3px;

  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
  }

  span {
    color: #fff;
    text-overflow: ellipsis;
    font-family: 'Pretendard-Regular';
    font-size: 9px;
    font-style: normal;
    font-weight: 600;
  }
`;
