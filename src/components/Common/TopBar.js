import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//images
import logo from "../../images/TopBar/Logo.svg";
import hamberger_bar from "../../images/TopBar/hamberger_bar.svg";
import serching_btn from "../../images/TopBar/serching_btn.svg";

//img
import boraarticle from "../../images/TopBar/topbar_boraarticle.svg";
import myPage from "../../images/TopBar/myPage-Btn.svg";
import help from "../../images/TopBar/topbar_help.svg";

const TopBar = () => {
    const [toggle, setToggle] = useState(false);
    //처음 사이드바 상태 false
    const openToggle = () => {
        {
            setToggle(!toggle);
        }
    };

    const navigate = useNavigate();
    const path = window.location.pathname;
    const navigatorG = () => {
        navigate("/guidebookpage");
    };
    const navigatorH = () => {
        navigate("/");
    };
    const navigatorM = () => {
        navigate("/mypage");
    };
    const navigatorS = () => {
        navigate("/searchingpage");
    };

    return (
        <>
            <Box>
                <Hambergerbar
                    src={hamberger_bar}
                    onClick={openToggle} //클릭 이벤트 핸들러 함수 등록
                />
                <Logo src={logo} onClick={navigatorH} />
                <SerchingBtn
                    src={path == "/searchingpage" ? null : serching_btn}
                    onClick={navigatorS}
                />
            </Box>
            {toggle ? (
                <SideBar>
                    <WatchingArticlePage
                        src={boraarticle}
                        onClick={navigatorH}
                    />
                    <AudioBookPage src={myPage} onClick={navigatorM} />
                    <MyPage src={help} onClick={navigatorG} />
                </SideBar>
            ) : null}
        </>
    );
};

export default TopBar;

//TopBar 부분

const Box = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;

    border-bottom: 1px solid #353646;
`;

const Logo = styled.img`
    position: absolute;
    top: 27px;
    left: 159px;
    width: 71px;
    height: 25px;
`;

const Hambergerbar = styled.img`
    position: absolute;
    top: 27px;
    left: 20px;
`;

const SerchingBtn = styled.img`
    position: absolute;
    top: 27px;
    right: 20px;
`;

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
