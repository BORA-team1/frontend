//
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";

//images
import step1 from "../images/guidepage/step1.svg";
import step2 from "../images/guidepage/step2.svg";
import step3 from "../images/guidepage/step3.svg";
import step4 from "../images/guidepage/step4.svg";
import step5 from "../images/guidepage/step5.svg";
import step6 from "../images/guidepage/step6.svg";
import step7 from "../images/guidepage/step7.svg";
import step8 from "../images/guidepage/step8.svg";
import step9 from "../images/guidepage/step9.svg";

import prev from "../images/guidepage/prev.svg";
import next from "../images/guidepage/next.svg";

import introduce_bora from "../images/guidepage/introduceBora.svg";

// props로 받아올 posts 구조 분해 할당
const GuidebookPage = () => {
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const imageArray1 = [step1, step2, step3];
  const imageArray2 = [step4, step5, step6, step7, step8, step9];

  const showPreviousImage = (imageArray, setCurrentImageIndex) => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageArray.length) % imageArray.length
    );
  };

  const showNextImage = (imageArray, setCurrentImageIndex) => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };
  return (
    <Container>
      <TopBar />
      <Scroll>
        <Box>
          <Title>
            <span>창밖을보라</span>를 처음 사용하신다면?
          </Title>
          <Intro>
            요즘 세대, 혹은 기성세대들과 소통하기 어려우신가요? <br /> 보는
            아티클을 통해 생각을 나누고, <br /> 라디오 아티클을 통해 가볍게
            아티클을 즐겨보세요. <br /> 창밖을보라를 통해 다른 세대와 소통하는
            경험을 체험해보세요.
          </Intro>

          <div>
            <Radio>
              <span>라디오</span> 아티클, 어떻게 사용하나요?
            </Radio>
            <GrayBox>
              <RadioTitle>보는 아티클에서 시작하기</RadioTitle>
              <Box2>
                <Prev
                  src={prev}
                  onClick={() =>
                    showPreviousImage(imageArray1, setCurrentImageIndex1)
                  }
                />
                <RadioImgList>
                  <RadioImg src={imageArray1[currentImageIndex1]} />
                </RadioImgList>

                <Next
                  src={next}
                  onClick={() =>
                    showNextImage(imageArray1, setCurrentImageIndex1)
                  }
                />
              </Box2>
            </GrayBox>

            <GrayBox>
              <RadioTitle>재생목록으로 시작하기</RadioTitle>
              <Box2>
                <Prev
                  src={prev}
                  onClick={() =>
                    showPreviousImage(imageArray2, setCurrentImageIndex2)
                  }
                />
                <RadioImgList>
                  <div>
                    <p>첫번째, 듣고 싶은 아티클을 선택해주세요.</p>
                    <RadioImg src={imageArray2[currentImageIndex2]} />
                  </div>
                </RadioImgList>
                <Next
                  src={next}
                  onClick={() =>
                    showNextImage(imageArray2, setCurrentImageIndex2)
                  }
                />
              </Box2>
            </GrayBox>
          </div>
          <Introducing src={introduce_bora} />
        </Box>
      </Scroll>
    </Container>
  );
};

export default GuidebookPage;

//전체 styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 390px;
  height: 844px;
  margin: 0px auto;

  background-color: #161524;
  color: #fff;
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 730px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;

  display: flex;
  width: 372px;
  height: 25px;
  justify-content: center;

  color: #fff;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: 14.4px;
  span {
    color: var(--main-purple, #5a45f5);
  }
`;

const Intro = styled.div`
  font-family: "Pretendard-Regular";
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  opacity: 0.7;

  display: flex;
  width: 321px;
  height: 70px;
  flex-direction: column;
  justify-content: center;
`;

const Introducing = styled.img`
  width: 246px;
  height: 342px;
  margin-top: 347px;
  margin-bottom: 80px;
`;

const Radio = styled.div`
  margin-top: 70px;
  margin-bottom: 20px;
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  span {
    color: var(--main-purple, #5a45f5);
  }
`;

const RadioTitle = styled.div`
  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  span {
    color: var(--main-purple, #5a45f5);
  }
`;

const GrayBox = styled.div`
  width: 390px;
  height: 407px;
  background: var(--card-color, #2b2c3f);
  margin-bottom: 40px;
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RadioImgList = styled.div`
  display: flex;
`;

const RadioImg = styled.img`
  width: 209px;
  height: 317px;
`;

const Next = styled.img`
  width: 30.455px;
  height: 30.455px;
`;

const Prev = styled.img`
  width: 30.455px;
  height: 30.455px;
`;
