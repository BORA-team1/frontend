import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled, {css} from 'styled-components';
import axios from 'axios';

//context
import {useAuth} from '../contexts/AuthContext';

//images
import X from '../images/X.svg';

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [interest, setInterest] = useState([]);
  const [profile, setProfile] = useState('');
  const [age, setAge] = useState('');

  // 리렌더링용 변수
  const {BASE_URL} = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (birthYear) {
      const calculatedAgeGroup = calculateAgeGroup(Number(birthYear));
      setAge(calculatedAgeGroup);

      const interestArray = interest
        .split('#')
        .slice(1)
        .map((tag) => ({'hashtag': tag.trim()}));

      console.log(interestArray);
      try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('nickname', nickname);
        formData.append('profile', profile);
        formData.append('age', calculatedAgeGroup);

        interestArray.forEach((interest, index) => {
          formData.append(`interest[${index}]`, JSON.stringify(interest));
          console.log(interest);
        });

        const response = await axios.post(
          `${BASE_URL}account/signup/`,
          formData
        );

        // 회원가입 성공 시 처리
        setAge('');
        navigate(`/login`);
        console.log(response);
      } catch (error) {
        // 오류 처리
        console.error(error);
      }
    }
  };

  //아이디 규격 확인
  const [usernameValid, setUsernameValid] = useState(true);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    const alphanumericPattern = /^[a-zA-Z0-9]{6,}$/;

    if (alphanumericPattern.test(value)) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }

    setUsername(value);
  };

  //아이디 중복 확인
  const [duplicate, setDuplicate] = useState(null); // 중복 여부 상태

  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.post(`${BASE_URL}account/duplicate/`, {
        username: username,
      });

      // 중복 아님
      if (response.data.duplicate === false) {
        setDuplicate(false);
        // 중복 아님을 사용자에게 표시하는 로직 추가
      } else {
        setDuplicate(true);
        // 중복임을 사용자에게 표시하는 로직 추가
      }
    } catch (error) {
      console.error('중복 확인 중 오류가 발생했습니다.', error);
    }
  };

  //비밀번호 일치 확인
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

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
    setPasswordValid(isPasswordValid(password));
  }, [password]);

  const isPasswordValid = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password
    );

    return (
      password.length >= 10 &&
      [hasLowerCase, hasUpperCase, hasDigit, hasSpecialChar].filter(Boolean)
        .length >= 2
    );
  };

  //연령층 계산
  const [birthYear, setBirthYear] = useState(''); // 출생 연도 입력값

  const calculateAgeGroup = (birthYear) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const age = currentYear - birthYear + 1;

    let ageGroup = '';
    if (age >= 10 && age < 20) {
      ageGroup = '1';
    } else if (age >= 20 && age < 30) {
      ageGroup = '2';
    } else if (age >= 30 && age < 40) {
      ageGroup = '3';
    } else if (age >= 40 && age < 50) {
      ageGroup = '4';
    } else if (age >= 50) {
      ageGroup = '5';
    }
    console.log(ageGroup);
    return ageGroup;
  };

  // 생년월일 입력 처리
  const handleBirthYearChange = (e) => {
    const value = e.target.value;
    // 숫자만 남기도록 처리
    const numericValue = value.replace(/\D/g, '');

    // 4글자 이상 입력되지 않도록 제한
    if (numericValue.length <= 4) {
      setBirthYear(numericValue);
    }
  };

  //이미지 미리보기
  const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 파일
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    // 이미지 선택 시 setProfile 호출
    setProfile(imageFile);
  };

  //버튼 활성화
  const [requiredFieldsValid, setRequiredFieldsValid] = useState(false);
  useEffect(() => {
    const isRequiredFieldsValid =
      usernameValid &&
      passwordValid &&
      passwordMatch &&
      birthYear.length === 4 &&
      nickname.length > 0 &&
      profile;

    setRequiredFieldsValid(isRequiredFieldsValid);
  }, [
    usernameValid,
    passwordValid,
    passwordMatch,
    birthYear,
    nickname,
    interest,
    profile,
  ]);

  return (
    <Wrapper>
      <Box>
        <Del
          src={X}
          onClick={() => {
            navigate('/initial');
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
            type='text'
            placeholder='예 : bora1234'
            value={username}
            onChange={handleUsernameChange}
          />
          <Check onClick={handleCheckDuplicate}>중복확인</Check>
          {usernameValid ? (
            <Condition>영문과 숫자를 조합하여 6자 이상</Condition>
          ) : (
            <Condition style={{color: '#FF5E2B'}}>
              아이디가 형식에 맞지 않습니다. 다시 입력해주십시오.
            </Condition>
          )}
          {duplicate === true && (
            <Condition style={{color: '#FF5E2B'}}>
              같은 아이디가 이미 존재합니다. 다른 아이디로 다시 입력해주세요.
            </Condition>
          )}
          {duplicate === false && (
            <ConditionGood>사용 가능한 아이디입니다.</ConditionGood>
          )}
        </ID>
        <div style={{marginBottom: '30px'}}>
          <Guide>
            비밀번호 <span>*</span>
          </Guide>
          <Input
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Condition>
            영문, 숫자, 특수문자 중 2개 이상 조합하여 10자 이상
          </Condition>
        </div>
        <div style={{marginBottom: '60px'}}>
          <Guide>
            비밀번호 확인 <span>*</span>
          </Guide>
          <Input
            type='password'
            placeholder='위에서 입력한 비밀번호를 한 번 더 입력해 주세요.'
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          {passwordMatch && passwordValid ? (
            <ConditionGood>비밀번호가 일치합니다.</ConditionGood>
          ) : (
            <Condition>
              {passwordMatch
                ? '영문, 숫자, 특수문자 중 2개 이상 조합하여 10자 이상'
                : '비밀번호가 일치하지 않습니다.'}
            </Condition>
          )}
        </div>
        <div style={{marginBottom: '50px'}}>
          <Guide>
            닉네임 <span>*</span>
          </Guide>
          <Input
            type='text'
            placeholder='창밖을보라에서 사용할 닉네임을 입력해 주세요.'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div style={{marginBottom: '88px'}}>
          <Guide>
            생년월일 <span>*</span>
          </Guide>
          <InputY
            type='text'
            placeholder='YYYY'
            value={birthYear}
            onChange={handleBirthYearChange}
          />
          <InputM type='text' placeholder='MM' />
          <InputD type='text' placeholder='DD' />
          <Condition>왼쪽부터 년 (YYYY), 월 (MM), 일 (DD) 순 입력</Condition>
        </div>
        <div style={{marginBottom: '50px'}}>
          <Guide>관심사</Guide>
          <InputI
            type='text'
            placeholder='예 : #라이프 #건강 #테크 #문화 #경제 #환경'
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
          <Condition>관심사 및 선호하는 주제를 '#'를 이용하여 입력</Condition>
        </div>
        <div>
          <Guide>프로필 이미지</Guide>
          <ConditionP>
            창밖을보라에서 사용할 프로필 사진을 선택해 주세요.
          </ConditionP>
          <InputImgContainer>
            <InputImg
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
            {selectedImage && (
              <PreviewImage src={selectedImage} alt='Profile Preview' />
            )}
          </InputImgContainer>
        </div>
        <Btn onClick={handleSignup} disabled={!requiredFieldsValid}>
          회원가입
        </Btn>
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

const InputGuide = styled.input`
  border-radius: 5px;
  background: var(--card-color, #2b2c3f);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  border: none;
  outline: none;

  font-family: 'Pretendard-Regular';
  font-size: 13px;
  font-style: normal;
  color: #fff;

  padding-left: 10px;
  margin: 10px 0px;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
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
  font-family: 'Pretendard-Regular';
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

const Guide = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #fff;

  span {
    color: var(--sub-purple, #a397ff);
  }
`;
const Input = styled(InputGuide)`
  width: 340px;
  height: 46px;
`;

const Condition = styled.div`
  font-family: 'Pretendard-Regular';
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;

const ConditionGood = styled.div`
  font-family: 'Pretendard-Regular';
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

const InputID = styled(InputGuide)`
  width: 241px;
  height: 46px;
  margin-right: 10px;
`;

const Check = styled.button`
  width: 89px;
  height: 46px;
  border-radius: 5px;
  background: var(--main-purple, #5a45f5);
  border: none;
  color: #fff;
  text-align: center;
  font-family: 'Pretendard-Regular';

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

//생년월일

const InputY = styled(InputGuide)`
  width: 81px;
  height: 46px;
`;

const InputM = styled(InputGuide)`
  width: 71px;
  height: 46px;

  margin: 10px;
`;

const InputD = styled(InputGuide)`
  width: 71px;
  height: 46px;
`;

//이미지

const InputImgContainer = styled.div`
  width: 141px;
  height: 141px; //임의로 수정
  position: relative;
  display: inline-block;

  border-radius: 5px;
  border-radius: 5.001px;
  border: 0.5px dashed #fff;
  box-shadow: 0px 0px 3.333965301513672px 0px rgba(0, 0, 0, 0.25);
  outline: none;

  margin-bottom: 60px;
  margin-top: 25px;
`;

const InputImg = styled.input`
  position: absolute;
  opacity: ${({selectedImage}) => (selectedImage ? 0 : 1)};
  width: 131px;
  height: 131px;
`;

const PreviewImage = styled.img`
  width: 131px;
  height: 131px;
  border-radius: 5px;
  margin-top: 10px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ConditionP = styled.div`
  font-family: 'Pretendard-Regular';
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  margin-top: 7px;
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
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;

  ${(props) =>
    !props.disabled &&
    css`
      background: var(--main-purple, #5a45f5);
      color: #fff;
      cursor: pointer;
    `}
`;

const InputI = styled(InputGuide)`
  width: 350px;
  height: 46px;
  color: var(--sub-purple, #a397ff);
`;
