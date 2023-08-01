import React from "react";
import styled from "styled-components";

//components
import TopBar from "../components/MainPage/TopBar";
import TodayArticle from "../components/MainPage/TodayArticle";
import DifficultyArticle from "../components/MainPage/DifficultyArticle";
import InterestArticle from "../components/MainPage/InterestArticle";

//images
import listeningarticle_btn from "../images/ListeningArticleBtn.svg";

// props로 받아올 posts 구조 분해 할당
const MyPage = () => {
    return (
        <Container>
            <TopBar />
            <Scroll>
                <>
                    {/* 듣는 아티클 부분 */}
                    <UserProfile></UserProfile>
                    <BookMarkList>북마크</BookMarkList>
                    <FollowingEditerList>팔로우한 에디터</FollowingEditerList>
                    <SavedPlayList>저장한 재생목록</SavedPlayList>
                </>
            </Scroll>
        </Container>
    );
};

export default MyPage;

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
//

const DetailBox = styled.div`
    width: 320px;
    display: inline-flex;
    padding: 20px 15px;
    margin-left: 20px;
    margin-bottom: 20px;

    border-radius: 15px;
    background: var(--sub-background, #242237);
`;

const UserProfile = styled(DetailBox)`
    height: 44px;
    margin-top: 20px;
`;

const BookMarkList = styled(DetailBox)`
    height: 151px;
`;

const FollowingEditerList = styled(DetailBox)`
    height: 81px;
`;

const SavedPlayList = styled(DetailBox)`
    height: 151px;
`;
