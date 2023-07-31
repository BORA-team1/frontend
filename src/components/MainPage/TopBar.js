import React from "react";
import styled from "styled-components";

//images
import logo from "../../images/Logo.svg";
import hamberger_bar from "../../images/hamberger_bar.svg";
import serching_btn from "../../images/serching_btn.svg";

const TopBar = () => {
    return (
        <Box>
            <Hambergerbar src={hamberger_bar} />
            <Logo src={logo} />
            <SerchingBtn src={serching_btn} />
        </Box>
    );
};

export default TopBar;

//TopBar 부분

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 77px;

    border-bottom: 1px solid #353646;
`;

const Logo = styled.img`
    width: 71px;
    height: 25px;
`;

const Hambergerbar = styled.img``;

const SerchingBtn = styled.img``;
