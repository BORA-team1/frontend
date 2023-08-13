//loginpage
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//context
import { useAuth } from "../contexts/AuthContext";
//img
import logo from "../images/InitialPage/Logo.svg";
import name from "../images/InitialPage/Name.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  // 리렌더링용 변수
  const [render, setRender] = useState(0);
  // 받을 변수들
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //사용자 상태 관리
  const { login } = useAuth();

  const BASE_URL = "https://juliaheo.pythonanywhere.com/";
  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}account/login/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        //로그인 성공했을 때
        setRender(render + 1);
        navigate(`/`);

        // 로그인 로직 후 토큰을 설정
        login(
          response.data.data.id,
          response.data.data.nickname,
          response.data.data.access_token
        );

        console.log(response.data.data);
      })
      .catch((error) => console.log(error, username, password));
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Logo src={logo} />
          <Name src={name} />
          <InputWrapper>
            <Input
              type="text"
              value={username}
              placeholder="아이디"
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
          </InputWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default LoginPage;

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
  margin-top: 30px;
`;

const Input = styled.input`
  width: 340px;
  height: 46px;
  margin-bottom: 7px;
  color: #fff;

  padding-left: 10px;

  border-radius: 5px;
  background: var(--card-color, #2b2c3f);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;

  font-family: "Pretendard-Regular";
  font-style: normal;
`;

const Logo = styled.img`
  margin-top: 28px;
`;

const Name = styled.img`
  margin-top: 149px;
  margin-bottom: 50px;
  width: 84px;
  height: 65px;
`;

const LoginBtn = styled.button`
  width: 350px;
  height: 58px;
  margin-top: 43px;

  border-radius: 14px;
  background: var(--main-purple, #5a45f5);
  font-family: "Pretendard-Regular";
  font-style: normal;
  color: #fff;
  border: none;
`;
