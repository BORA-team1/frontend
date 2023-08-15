import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//components
import TopBar from "../components/Common/TopBar";
import TodayArticle from "../components/MainPage/MainCommon/TodayArticle";
import Editer from "../components/MyPage/Editer";
import SavedPlayList from "../components/MyPage/SavedPlaylist";

//images
import vector from "../images/vector_btn.svg";

//임시 img
import profile from "../images/profile.svg";

//context
import { useAuth } from "../contexts/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();

  // GET: 마이페이지 데이터
  const { authToken, BASE_URL, logout } = useAuth();
  useEffect(() => {
    getData();
  }, []);

  const [userinfo, setUserInfo] = useState([]);
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${BASE_URL}mypage/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data.data.user);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(
          "마이페이지 데이터를 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  return (
    <Container>
      <TopBar />
      <Scroll>
        {/* 유저 아이콘 부분 */}
        <UserProfile>
          <img src={profile}></img>
          <UserInfo>
            <div>{userinfo.nickname}</div>
            <div style={{ fontSize: "12px" }}>
              <span>선호 키워드</span>
              {userinfo.interest &&
                userinfo.interest.map((interest, index) => (
                  <div key={index}>#{interest.hashtag}</div>
                ))}
            </div>
          </UserInfo>
        </UserProfile>
        {/* 북마크 부분 */}
        <BookMarkList>
          <TitleBox>
            <div>
              북마크{" "}
              <span style={{ color: "rgba(255, 255, 255, 0.50)" }}>
                {data.book_num}
              </span>
            </div>
            <Btn
              src={vector}
              onClick={() => {
                navigate("/detailbookmarkpage");
              }}
            />
          </TitleBox>
          <BoxWrapper>
            {data.bookmarkPost &&
              data.bookmarkPost.map((article) => (
                <BoxContainer>
                  <TodayArticle key={article.post_id} article={article} />
                </BoxContainer>
              ))}
          </BoxWrapper>
        </BookMarkList>
        <FollowingEditorList>
          <TitleBox>
            <div>
              팔로우한 에디터{" "}
              <span style={{ color: "rgba(255, 255, 255, 0.50)" }}>
                {data.follows_num}
              </span>
            </div>
            <Btn
              src={vector}
              onClick={() => {
                navigate("/detaileditorpage");
              }}
            />
          </TitleBox>
          <BoxWrapper>
            {data.follows &&
              data.follows.map((editer, index) => (
                <Editer key={index} editer={editer} />
              ))}
          </BoxWrapper>
        </FollowingEditorList>
        <PlayList>
          <TitleBox>
            <div>
              저장한 재생목록{" "}
              <span style={{ color: "rgba(255, 255, 255, 0.50)" }}>
                {data.mypli_num}
              </span>
            </div>
            <Btn
              src={vector}
              onClick={() => {
                navigate("/detailplaylistpage");
              }}
            />
          </TitleBox>
          <BoxWrapper>
            {data.myPlaylist &&
              data.myPlaylist.map((playlist, index) => (
                <SavedPlayList key={index} playlist={playlist} />
              ))}
          </BoxWrapper>
        </PlayList>
        <LogOut
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          로그아웃
        </LogOut>
      </Scroll>
    </Container>
  );
};

export default MyPage;

//전체 styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 844px;
  background-color: #161524;
  margin: 0 auto;

  color: #fff;
  font-family: "Pretendard-Regular";
  font-style: normal;
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
  gap: 10px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;

  span {
    color: rgba(255, 255, 255, 0.5);
    margin-right: 5px;
  }

  div {
    display: flex;
    flex-direction: row;
    margin-right: 5px;
  }
`;

const BookMarkList = styled(DetailBox)`
  height: 151px;
`;

const BoxContainer = styled.div`
  width: 95px;
  height: 122px;
`;

const Btn = styled.img`
  width: 16px;
  height: 16px;
`;

const FollowingEditorList = styled(DetailBox)`
  height: 81px;
`;

const PlayList = styled(DetailBox)`
  display: flex;
  flex-direction: column;
  height: 151px;
  gap: 11px;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const LogOut = styled.div`
  width: 370px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  color: var(--on-red, #ff5e2b);
  font-size: 15px;
  font-weight: 500;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;
  cursor: pointer;
`;
