//loginpage
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//components
import TopBar from "../components/Common/TopBar";
//img
import logo from "../images/InitialPage/Logo.svg";
import name from "../images/InitialPage/Name.svg";

const InitialPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <Container>
          <Logo src={logo} />
          <Name src={name} />
          <Explain>
            최신 뉴스부터 가벼운 칼럼까지.
            <br /> <span>창밖을보라</span>에서 삶의 모든 이야기와 <br />
            흥미로운 타인의 생각까지 모두 확인해보세요.
          </Explain>
          <InputWrapper>
            <Signup
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </Signup>
            <Login
              onClick={() => {
                navigate("/login");
              }}
            >
              아이디로 로그인
            </Login>
          </InputWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default InitialPage;

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

const Signup = styled.div`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-size: 17px;
  font-weight: 600;

  width: 349px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background: var(--card-color, #2b2c3f);
  cursor: pointer;
`;

const Login = styled.div`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-size: 17px;
  font-weight: 600;

  width: 349px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  border-radius: 5px;
  background: var(--main-purple, #5a45f5);
  cursor: pointer;
`;

const Logo = styled.img`
  margin-top: 28px;
`;

const Name = styled.img`
  margin-top: 149px;
  margin-bottom: 40px;
  width: 84px;
  height: 65px;
`;

const Explain = styled.div`
  font-family: "Pretendard-Regular";
  font-style: normal;
  line-height: 155%; /* 21.7px */
  letter-spacing: -0.28px;
  text-align: center;

  margin-bottom: 70px;
  span {
    color: var(--main-purple, #5a45f5);
    font-weight: 700;
  }
`;
