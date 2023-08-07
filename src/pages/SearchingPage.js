import React from "react";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";

//images
import app_explaination from "../images/app_explain.svg";
import picked_keyword from "../images/picked_keyword.svg";
import serching_btn from "../images/TopBar/serching_btn.svg";

// props로 받아올 posts 구조 분해 할당
const SearchingPage = () => {
    const user = "지민";
    return (
        <Container>
            <TopBar />
            <Scroll>
                <>
                    {/* 듣는 아티클 부분 */}
                    <SearchingBox>
                        <SearchingBar placeholder="검색어를 입력하세요" />
                        <SearchingIcon src={serching_btn} />
                    </SearchingBox>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <PickedKeyword src={picked_keyword}></PickedKeyword>
                        <KeywordsList>
                            <Keyword>#라이프</Keyword>
                            <Keyword>#테크</Keyword>
                            <Keyword>#건강</Keyword>
                            <Keyword>#세계</Keyword>
                        </KeywordsList>
                    </div>
                    <Explaination src={app_explaination} />
                </>
            </Scroll>
        </Container>
    );
};

export default SearchingPage;

//전체 styled

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    position: relative;
    max-width: 390px;
    max-height: 844px;
    margin: 0px auto;

    background-color: #161524;
    color: #fff;
`;

const Scroll = styled.div`
    overflow-y: scroll;
    height: 730px;

    &::-webkit-scrollbar {
        display: none;
    }

    position: relative;
    z-index: 0;
`;

//검색 바 부분

const SearchingBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 350px;
    height: 43px;
    flex-shrink: 0;
    margin: 20px;

    border-radius: 20px;
    background: var(--card-color, #2b2c3f);
`;

const SearchingBar = styled.input`
    width: 290px;

    color: #fff;
    font-family: "Pretendard";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

    background-color: transparent;
    border-color: transparent;
    outline: none;

    margin-left: 12px;

    .input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const SearchingIcon = styled.img`
    width: 15px;
    height: 15px;

    margin-right: 12px;
`;

//아래 부분

const PickedKeyword = styled.img`
    width: 54px;
    height: 16px;

    margin-left: 20px;
`;

const KeywordsList = styled.div`
    display: flex;
    flex-direction: row;

    margin-left: 20px;
`;

const Keyword = styled.div`
    padding: 7px 14px;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px 5px 10px 0px;

    border-radius: 20px;
    border: 1px solid var(--sub-purple, #a397ff);

    color: var(--sub-purple, #a397ff);
    text-align: center;
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const Explaination = styled.img`
    margin-top: 20px;
    margin-left: 20px;
`;
