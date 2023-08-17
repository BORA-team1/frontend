import React, { useState } from "react";
import styled from "styled-components";
import Pie from "./Pie";

const VoteResult = ({ donevote }) => {
  const selectedVote = donevote;
  const initialPercentages = {
    result1: 0,
    result2: 0,
    result3: 0,
  };

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("10대");
  const [percentages, setPercentages] = useState(initialPercentages);

  const handleAgeGroupClick = (ageGroup, result1, result2, result3) => {
    setSelectedAgeGroup(ageGroup);
    const total = result1 + result2 + result3;
    const newPercentages = {
      result1: (result1 / total) * 100,
      result2: (result2 / total) * 100,
      result3: (result3 / total) * 100,
    };
    setPercentages(newPercentages);
  };

  return (
    <Container>
      <Title>
        정말 학교 수업만 듣고 수능을 잘 보는게 가능하다고 생각하시나요?
      </Title>
      <Age>
        <AgeGroup
          onClick={() =>
            handleAgeGroupClick(
              "10대",
              selectedVote.result.result1_10,
              selectedVote.result.result2_10,
              selectedVote.result.result3_10
            )
          }
          isSelected={selectedAgeGroup === "10대"}
        >
          10대
        </AgeGroup>
        <AgeGroup
          onClick={() =>
            handleAgeGroupClick(
              "20대",
              selectedVote.result.result1_20,
              selectedVote.result.result2_20,
              selectedVote.result.result3_20
            )
          }
          isSelected={selectedAgeGroup === "20대"}
        >
          20대
        </AgeGroup>
        <AgeGroup
          onClick={() =>
            handleAgeGroupClick(
              "30대",
              selectedVote.result.result1_30,
              selectedVote.result.result2_30,
              selectedVote.result.result3_30
            )
          }
          isSelected={selectedAgeGroup === "30대"}
        >
          30대
        </AgeGroup>
        <AgeGroup
          onClick={() =>
            handleAgeGroupClick(
              "40대",
              selectedVote.result.result1_40,
              selectedVote.result.result2_40,
              selectedVote.result.result3_40
            )
          }
          isSelected={selectedAgeGroup === "40대"}
        >
          40대
        </AgeGroup>
        <AgeGroup
          onClick={() =>
            handleAgeGroupClick(
              "50대",
              selectedVote.result.result1_50,
              selectedVote.result.result2_50,
              selectedVote.result.result3_50
            )
          }
          isSelected={selectedAgeGroup === "50대"}
        >
          50대
        </AgeGroup>
      </Age>
      <Result>
        <Percent>
          <div style={{ color: "#2B99FF" }}>
            {percentages.result1.toFixed(1)}%
          </div>
          <div style={{ color: "#FFDD2B" }}>
            {percentages.result2.toFixed(1)}%
          </div>
          <div style={{ color: "#FF5E2B" }}>
            {percentages.result3.toFixed(1)}%
          </div>
        </Percent>
        <List>
          <span>{donevote.item1}</span>
          <span>{donevote.item2}</span>
          <span>{donevote.item3}</span>
        </List>
        <Pie
          percentages={{
            result1: percentages.result1 / 100,
            result2: percentages.result2 / 100,
            result3: percentages.result3 / 100,
          }}
        />
      </Result>
      <Plus>
        <div>2023.07.03 ~ 2023.07.09 · 총 197명</div>
        <div>
          제작 <span>{donevote.vote_user.nickname}</span>
        </div>
      </Plus>
    </Container>
  );
};

export default VoteResult;

const Container = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  font-family: "Pretendard-Regular";
  font-style: normal;
`;

const Title = styled.div`
  color: #fff;
  font-size: 14.989px;
  font-weight: 400;
  line-height: 151.336%;
`;

const Age = styled.div`
  margin-top: 8.43px;
  margin-bottom: 25.21px;
  display: flex;
  flex-direction: row;
  gap: 3.93px;
`;

const AgeGroup = styled.div`
  cursor: pointer;
  color: ${({ isSelected }) =>
    isSelected ? "#1A1920" : "rgba(255, 255, 255, 0.5)"};
  font-size: 9.504px;
  font-weight: 600;
  line-height: normal;
  padding: 4.752px 9.504px;
  border-radius: 13.578px;
  border: 0.679px solid
    ${({ isSelected }) => (isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.5)")};
  background-color: ${({ isSelected }) =>
    isSelected ? "#ffffff" : "transparency"};
`;

const Result = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14.989px;
  font-weight: 600;
  line-height: 151.336%;
`;

const Percent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.61px;
`;

const List = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  margin-left: 16.32px;
  gap: 4.61px;

  color: #fff;
`;

const Plus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24.33px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 8.678px;
  font-weight: 600;
  line-height: 151.336%; /* 13.133px */

  div > span {
    color: #fff;
  }
`;
