import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//components
import TopBar from "../components/Common/TopBar";
import TodayArticle from "../components/MainPage/MainCommon/TodayArticle";
import DifficultyArticle from "../components/MainPage/MainCommon/DifficultyArticle";
import InterestArticle from "../components/MainPage/MainCommon/InterestArticle";

//images
import vector from "../images/vector_btn.svg";
//삭제하고 컴포넌트로 불러와야 하는 부분들
import userprofile from "../images/willbedeleted/userprofile.svg";
import userinfo from "../images/willbedeleted/userinfo.svg";
import bookmarkedimg from "../images/willbedeleted/bookmarkedimg.svg";
import followinggroup1 from "../images/willbedeleted/followinggroup1.svg";
import followinggroup2 from "../images/willbedeleted/followinggroup2.svg";
import savedpalylist from "../images/willbedeleted/savedpalylist.svg";

// props로 받아올 posts 구조 분해 할당
const MyPage = () => {
  const navigate = useNavigate();
  const navigatorB = () => {
    navigate("/detailbookmarkpage");
  };
  const navigatorE = () => {
    navigate("/detaileditorpage");
  };
  const navigatorP = () => {
    navigate("/detailplaylistpage");
  };
  return (
    <Container>
      <TopBar />
      <Scroll>
        <>
          {/* 듣는 아티클 부분 */}
          <UserProfile>
            <Content1 src={userprofile} />
            <Content2 src={userinfo} />
          </UserProfile>
          <BookMarkList>
            <TitleBox>
              <Title>북마크</Title>
              <Btn src={vector} onClick={navigatorB} />
            </TitleBox>
            <Content3 src={bookmarkedimg} />
          </BookMarkList>
          <FollowingEditorList>
            <TitleBox>
              <Title>팔로우한 에디터</Title>
              <Btn src={vector} onClick={navigatorE} />
            </TitleBox>
            <Content4 src={followinggroup1} />
          </FollowingEditorList>
          <SavedPlayList>
            <TitleBox>
              <Title>저장한 재생목록</Title>
              <Btn src={vector} onClick={navigatorP} />
            </TitleBox>
            <Content3 src={savedpalylist} />
          </SavedPlayList>
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
  padding: 20px 15px;
  margin-left: 20px;
  margin-bottom: 20px;

  border-radius: 15px;
  background: var(--sub-background, #242237);
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`; //양쪽으로 쪼개는 박스

const UserProfile = styled(DetailBox)`
  height: 44px;
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BookMarkList = styled(DetailBox)`
  height: 151px;
`;

const Title = styled.div`
  font-family: "Pretendard-Regular";
`;

const Btn = styled.img`
  width: 16px;
  height: 16px;
`;

const FollowingEditorList = styled(DetailBox)`
  height: 81px;
`;

const SavedPlayList = styled(DetailBox)`
  height: 151px;
`;

const Content1 = styled.img`
  width: 50px;
  height: 50px;
`;

const Content2 = styled.img`
  margin-left: 6px;
  width: 266px;
  height: 36px;
`;

const Content3 = styled.img`
  width: 200px;
  height: 122px;
  margin-top: 10px;
`;

const Content4 = styled.img`
  width: 284px;
  height: 53px;
  margin-top: 10px;
`;
