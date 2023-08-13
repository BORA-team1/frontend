import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//components
import TopBar from '../components/Common/TopBar';

//context
import {useAuth} from '../contexts/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profile, setProfile] = useState('');
  // const [gender, setGender] = useState("");
  const [age, setAge] = useState('');

  // 리렌더링용 변수
  const [render, setRender] = useState(0);

  const {BASE_URL} = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}account/signup/`, {
        username: username,
        password: password,
        nickname: nickname,
        profile: profile,
        // gender: gender,
        age: age,
      })
      .then((response) => {
        //회원가입 성공했을 때
        setRender(render + 1);
        navigate(`/login`);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <TopBar />
      <Container>
        <h3>회원가입 페이지</h3>
        <InputWrapper>
          <input
            type='text'
            placeholder='아이디'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='text'
            placeholder='닉네임'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type='text'
            placeholder='프로필'
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="성별"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          /> */}
          <input
            type='number'
            placeholder='나이'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button onClick={handleSignup}>회원가입</button>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

export default SignupPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 390px;
  height: 844px;
  margin: 0px auto;

  background-color: #161524;
  color: #fff;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-top: 30px;
  input,
  button {
    height: 40px;
    border-style: none;
    outline: none;
    border-radius: 4px;
  }
  input {
    margin-bottom: 15px;
    padding-left: 7%;

    background: #ffffff;
    box-shadow: 0px 2px 6px 0px #a5a5a533;
  }
  button {
    background: #809bc3;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
`;
