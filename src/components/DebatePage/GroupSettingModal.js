import React, { useState } from "react";
import styled from "styled-components";

//img
import usericon from "../../images/willbedeleted/UserIcon.svg";
import people_on from "../../images/Debate/people_on.svg";
import people_off from "../../images/Debate/people_off.svg";
import ready_debate from "../../images/Debate/ready_debate.svg";
import start_debate from "../../images/Debate/start_debate.png";

const GroupSettingModal = () => {
    //이거 1,2,3,4,5,6도 인원수 따라서 어떻게 나올지 한 번 상황 보고 위 아래로 1,2 하던가 배정을 잘 바꿔야할 듯
    const [people1, setPeople1] = useState(false);
    const [people2, setPeople2] = useState(false);
    const [people3, setPeople3] = useState(false);
    const [people4, setPeople4] = useState(false);
    const [people5, setPeople5] = useState(false);
    const [people6, setPeople6] = useState(false);
    //....이게 맞나

    const allPeopleSelected =
        people1 && people2 && people3 && people4 && people5 && people6;
    const startBtn = allPeopleSelected ? start_debate : ready_debate;

    const applyDebate = (peopleNum) => {
        switch (peopleNum) {
            case 1:
                setPeople1(!people1);
                break;
            case 2:
                setPeople2(!people2);
                break;
            case 3:
                setPeople3(!people3);
                break;
            case 4:
                setPeople4(!people4);
                break;
            case 5:
                setPeople5(!people5);
                break;
            case 6:
                setPeople6(!people6);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <Wrapper>
                <Container>
                    <Title>찬성/반대 정하기</Title>
                    <div
                        style={{
                            alignItems: "flex-start",
                            width: "260px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <Part>찬성</Part>
                            <PeopleNum>3명</PeopleNum>
                        </div>
                        <PeopleBox>
                            <People
                                onClick={() => applyDebate(1)}
                                src={people1 ? people_on : people_off}
                            />
                            {people1 && (
                                <UserIcon
                                    style={{ top: "76px", left: "48px" }}
                                    src={usericon}
                                />
                            )}
                            <People
                                onClick={() => applyDebate(2)}
                                src={people2 ? people_on : people_off}
                            />
                            {people2 && (
                                <UserIcon
                                    style={{ top: "76px", left: "113px" }}
                                    src={usericon}
                                />
                            )}
                            <People
                                onClick={() => applyDebate(3)}
                                src={people3 ? people_on : people_off}
                            />
                            {people3 && (
                                <UserIcon
                                    style={{ top: "76px", left: "178px" }}
                                    src={usericon}
                                />
                            )}
                        </PeopleBox>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                <Part>찬성</Part>
                                <PeopleNum>3명</PeopleNum>
                            </div>
                            <PeopleBox>
                                <People
                                    onClick={() => applyDebate(4)}
                                    src={people4 ? people_on : people_off}
                                />
                                {people4 && (
                                    <UserIcon
                                        style={{ top: "160px", left: "48px" }}
                                        src={usericon}
                                    />
                                )}
                                <People
                                    onClick={() => applyDebate(5)}
                                    src={people5 ? people_on : people_off}
                                />
                                {people5 && (
                                    <UserIcon
                                        style={{ top: "160px", left: "113px" }}
                                        src={usericon}
                                    />
                                )}
                                <People
                                    onClick={() => applyDebate(6)}
                                    src={people6 ? people_on : people_off}
                                />
                                {people6 && (
                                    <UserIcon
                                        style={{ top: "160px", left: "178px" }}
                                        src={usericon}
                                    />
                                )}
                            </PeopleBox>
                        </div>
                    </div>
                    <Explaination1>
                        원하는 집단의 아이콘을 클릭하세요.
                    </Explaination1>
                    <Explaination2>*집단 선택은 선착순입니다.</Explaination2>
                    <StartBtn src={startBtn} />
                </Container>
            </Wrapper>
        </>
    );
};

export default GroupSettingModal;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    width: 390px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
    position: absolute;
    top: 180px;
    width: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px 30px 20px;

    border-radius: 10px;
    border: 1px solid var(--unnamed, #353646);
    background: #161524;
    box-sizing: border-box;
`;

const Font = styled.div`
    color: #fff;
    font-family: "Pretendard-Regular";
    font-style: normal;
    line-height: normal;
`;

const Title = styled(Font)`
    margin-top: -20px;
    padding: 10px 20px;
    border-radius: 20px;
    background: var(--main-purple, #5a45f5);

    font-size: 18px;
    font-weight: 700;
`;

const Part = styled(Font)`
    font-size: 15px;
    font-weight: 700;

    margin-top: 20px;
`;

const PeopleNum = styled(Font)`
    color: rgba(255, 255, 255, 0.7);

    font-size: 15px;
    font-weight: 500;

    margin-left: 3px;
    margin-top: 20px;
`;

const People = styled.img`
    margin: 5px 24px 0px 0px;
    position: relative;
    z-index: 1;
`;

const UserIcon = styled.img`
    position: absolute;
    z-index: 2;

    width: 26.897px;
    height: 36.677px;
`;

const PeopleBox = styled.div``;

const Explaination1 = styled(Font)`
    position: absolute;
    top: calc(100% + 20px);
    font-size: 15px;
    font-weight: 500;
`;

const Explaination2 = styled(Font)`
    position: absolute;
    top: calc(100% + 43px);
    font-size: 15px;
    font-weight: 500;
`;

const StartBtn = styled.img`
    position: absolute;
    top: calc(100% + 100px);
    cursor: pointer;

    width: 150px;
    height: 37px;
`;
