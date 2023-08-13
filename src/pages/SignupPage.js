import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//context
import { useAuth } from "../contexts/AuthContext";

//images
import X from "../images/X.svg";

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  // const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  // 리렌더링용 변수
  const [render, setRender] = useState(0);

  const { BASE_URL } = useAuth();

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

  //비밀번호 일치 확인
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  useEffect(() => {
    if (password === passwordConfirm) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    //비밀번호 규격 맞는지 확인하는 로직
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password
    );

    if (
      password.length >= 10 &&
      [hasLowerCase, hasUpperCase, hasDigit, hasSpecialChar].filter(Boolean)
        .length >= 2
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [password]);

  return (
    <Wrapper>
      <Box>
        <Del
          src={X}
          onClick={() => {
            navigate("/initial");
          }}
        />
        <Title>회원가입</Title>
      </Box>
      <Container>
        <ID>
          <Guide>
            아이디 <span>*</span>
          </Guide>
          <InputID
            type="text"
            placeholder="예 : bora1234"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Check>중복확인</Check>
          <Condition>영문과 숫자를 조합하여 6자 이상</Condition>
          <ConditionGood>사용 가능한 아이디입니다.</ConditionGood>
        </ID>
        <div style={{ marginBottom: "30px" }}>
          <Guide>
            비밀번호 <span>*</span>
          </Guide>
          <Input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Condition>
            영문, 숫자, 특수문자 중 2개 이상 조합하여 10자 이상
          </Condition>
        </div>
        <div style={{ marginBottom: "60px" }}>
          <Guide>
            비밀번호 확인 <span>*</span>
          </Guide>
          <Input
            type="password"
            placeholder="위에서 입력한 비밀번호를 한 번 더 입력해 주세요."
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          {passwordMatch && passwordValid ? (
            <ConditionGood>비밀번호가 일치합니다.</ConditionGood>
          ) : (
            <Condition>
              {passwordMatch
                ? "영문, 숫자, 특수문자 중 2개 이상 조합하여 10자 이상"
                : "비밀번호가 일치하지 않습니다."}
            </Condition>
          )}
        </div>
        <div style={{ marginBottom: "50px" }}>
          <Guide>
            닉네임 <span>*</span>
          </Guide>
          <Input
            type="text"
            placeholder="창밖을보라에서 사용할 닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "88px" }}>
          <Guide>
            생년월일 <span>*</span>
          </Guide>
          <Input
            type="text"
            placeholder="나이"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "50px" }}>
          <Guide>관심사</Guide>
          <Input
            type="text"
            placeholder="예 : #라이프, #건강, #테크, #문화, #경제, #환경"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </div>
        <div>
          <Guide>프로필 이미지</Guide>
          <Condition>
            창밖을보라에서 사용할 프로필 사진을 선택해 주세요.
          </Condition>
          <InputImg
            type="file"
            accept="image/*"
            placeholder="프로필"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </div>
        <Btn onClick={handleSignup}>회원가입</Btn>
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
  max-width: 390px;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  box-sizing: border-box;
  padding-left: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//상단바 부분
const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 390px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #353646;
`;

const Title = styled.div`
  color: #fff;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;
`;

const Del = styled.img`
  position: absolute;
  left: 20px;
  width: 18px;
  height: 18px;
`;

//내용 부분
// const InputWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 30px;
// `;

const Guide = styled.div`
  font-family: "Pretendard-Regular";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #fff;

  span {
    color: var(--sub-purple, #a397ff);
  }
`;
const Input = styled.input`
  font-family: "Pretendard-Regular";
  font-size: 13px;
  font-style: normal;
  color: #fff;

  width: 340px;
  height: 46px;
  padding-left: 10px;
  margin: 10px 0px;

  border-radius: 5px;
  background: var(--card-color, #2b2c3f);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  border: none;
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Condition = styled.div`
  font-family: "Pretendard-Regular";
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

const ConditionGood = styled.div`
  font-family: "Pretendard-Regular";
  color: var(--main-purple, #5a45f5);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

//ID
const ID = styled.div`
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const InputID = styled.input`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-size: 13px;
  color: #fff;

  width: 241px;
  height: 46px;
  padding-left: 10px;
  margin: 10px 0px;

  border-radius: 5px;
  background: var(--card-color, #2b2c3f);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  border: none;
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Check = styled.button`
  width: 89px;
  height: 46px;
  border-radius: 5px;
  background: var(--main-purple, #5a45f5);
  border: none;
  color: #fff;
  text-align: center;
  font-family: "Pretendard-Regular";

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

//이미지
const InputImg = styled.input`
  font-family: "Pretendard-Regular";
  font-style: normal;

  width: 131px;
  height: 131px;
  border-radius: 5px;
  border-radius: 5.001px;
  border: 0.5px dashed #fff;
  box-shadow: 0px 0px 3.333965301513672px 0px rgba(0, 0, 0, 0.25);
  outline: none;

  margin-bottom: 60px;
`;

const Btn = styled.button`
  width: 349px;
  height: 58px;
  margin: 30px 0px;
  padding: 18px 0px 19px 0px;

  border-radius: 14px;
  background: var(--sub-background, #242237);
  border: none;

  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;
