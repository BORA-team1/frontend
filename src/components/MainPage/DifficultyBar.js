import React, { useState } from "react";
import styled from "styled-components";

//components
import DifficultyArticle from "./MainCommon/DifficultyArticle";

//images
import starone_on from "../../images/DifficultyBar/starone_on.svg";
import startwo_on from "../../images/DifficultyBar/startwo_on.svg";
import starthree_on from "../../images/DifficultyBar/starthree_on.svg";
import starone_off from "../../images/DifficultyBar/starone_off.svg";
import startwo_off from "../../images/DifficultyBar/startwo_off.svg";
import starthree_off from "../../images/DifficultyBar/starthree_off.svg";
//프로그래스바 통째로 받아온 거
import light from "../../images/DifficultyBar/difficulty_bar_light.svg";
import medium from "../../images/DifficultyBar/difficulty_bar__medium.svg";
import heavy from "../../images/DifficultyBar/difficulty_bar_heavy.svg";
//문구..ㅎ
import textlight_on from "../../images/DifficultyBar/text_light_on.svg";
import textmedium_on from "../../images/DifficultyBar/text_medium_on.svg";
import textheavy_on from "../../images/DifficultyBar/text_heavy_on.svg";
import textlight_off from "../../images/DifficultyBar/text_light_off.svg";
import textmedium_off from "../../images/DifficultyBar/text_medium_off.svg";
import textheavy_off from "../../images/DifficultyBar/text_heavy_off.svg";

// props로 받아올 posts 구조 분해 할당
const DifficultyBar = () => {
    const [difficulty, setDifficulty] = useState(light);
    const [onoff_one, setOnOffOne] = useState(true);
    const [onoff_two, setONOFFTwo] = useState(false);
    const [onoff_three, setONOFFThree] = useState(false);

    const setActiveOnOff = (index) => {
        if (index === 1) {
            setOnOffOne(true);
            setONOFFTwo(false);
            setONOFFThree(false);
            setDifficulty(light);
        } else if (index === 2) {
            setOnOffOne(false);
            setONOFFTwo(true);
            setONOFFThree(false);
            setDifficulty(medium);
        } else if (index === 3) {
            setOnOffOne(false);
            setONOFFTwo(false);
            setONOFFThree(true);
            setDifficulty(heavy);
        }
    };

    return (
        <Box>
            <StarPinList>
                <StarOne
                    src={onoff_one ? starone_on : starone_off}
                    onClick={() => setActiveOnOff(1)}
                />
                <StarTwo
                    src={onoff_two ? startwo_on : startwo_off}
                    onClick={() => setActiveOnOff(2)}
                />
                <StarThree
                    src={onoff_three ? starthree_on : starthree_off}
                    onClick={() => setActiveOnOff(3)}
                />
            </StarPinList>
            <ProgressBar src={difficulty} />
            <DifficultyList>
                <TextLight src={onoff_one ? textlight_on : textlight_off} />
                <TextMedium src={onoff_two ? textmedium_on : textmedium_off} />
                <TextHeavy src={onoff_three ? textheavy_on : textheavy_off} />
            </DifficultyList>
        </Box>
    );
};

export default DifficultyBar;

const Box = styled.div`
    display: flex;
    flex-direction: column;

    margin: 20px;
`;

const StarOne = styled.img`
    padding-left: 60px;
`;

const StarTwo = styled.img`
    padding-left: 90px;
`;

const StarThree = styled.img`
    padding-left: 95px;
`;

const StarPinList = styled.div``;

const ProgressBar = styled.img`
    width: 350px;
    height: 13px;

    margin: 2px 0px;
`;

const DifficultyList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 13px;

    margin-top: 10px;
`;

const TextLight = styled.img`
    padding-left: 65px;
`;

const TextMedium = styled.img`
    padding-left: 90px;
`;

const TextHeavy = styled.img`
    padding-left: 90px;
`;
