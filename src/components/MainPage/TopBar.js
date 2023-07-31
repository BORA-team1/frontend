import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//images
import logo from "../../images/Logo.svg";
import hamberger_bar from "../../images/hamberger_bar.svg";
import serching_btn from "../../images/serching_btn.svg";

//img
import watchingPageBtn from "../../images/watchingarticlePage-Btn.svg";
import audiobookPageBtn from "../../images/listeningarticlePage-Btn.svg";
import myPageBtn from "../../images/myPage-Btn.svg";

const TopBar = () => {
    const [toggle, setToggle] = useState(false);
    //처음 사이드바 상태 false
    const openToggle = () => {
        {
            setToggle(!toggle);
        }
    };

    const navigate = useNavigate();
    const navigatorA = () => {
        navigate("/audiobookpage");
    };
    const navigatorH = () => {
        navigate("/home");
    };
    const navigatorM = () => {
        navigate("/mypage");
    };

    return (
        <>
            <Box>
                <Hambergerbar
                    src={hamberger_bar}
                    onClick={openToggle} //클릭 이벤트 핸들러 함수 등록
                />
                <Logo src={logo} />
                <SerchingBtn src={serching_btn} />
            </Box>
            {toggle ? (
                <SideBar>
                    <WatchingArticlePage
                        src={watchingPageBtn}
                        onClick={navigatorH}
                    />
                    <AudioBookPage
                        src={audiobookPageBtn}
                        onClick={navigatorA}
                    />
                    <MyPage src={myPageBtn} onClick={navigatorM} />
                </SideBar>
            ) : null}
        </>
    );
};

export default TopBar;

//TopBar 부분

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 80px;

    border-bottom: 1px solid #353646;
`;

const Logo = styled.img`
    width: 71px;
    height: 25px;
`;

const Hambergerbar = styled.img``;

const SerchingBtn = styled.img``;

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 81px;
    background-color: #161524;
    z-index: 100;
`;

const WatchingArticlePage = styled.img`
    width: 390px;
    height: 67px;

    border-bottom: 1px solid #353646;
`;

const AudioBookPage = styled.img`
    width: 390px;
    height: 67px;

    border-bottom: 1px solid #353646;
`;

const MyPage = styled.img`
    width: 390px;
    height: 67px;

    border-bottom: 1px solid #353646;
`;
