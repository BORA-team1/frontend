//loginpage
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//components
import TopBar from "../components/Common/TopBar";
//images

const LoginPage = () => {
  const navigate = useNavigate();
  // 리렌더링용 변수
  const [render, setRender] = useState(0);
  // 받을 변수들
  const [id, setID] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "https://juliaheo.pythonanywhere.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/account/login/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        //로그인 성공했을 때
        setRender(render + 1);
        navigate(`/`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Wrapper>
        <TopBar />
        <Container>
          <InputWrapper>
            <input
              type="text"
              value={id}
              placeHolder="아이디"
              onChange={(e) => setID(e.target.value)}
            ></input>
            <input
              type="text"
              value={username}
              placeHolder="닉네임"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
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
