import styled from "styled-components";
//components
import Difficulty from "../MainPage/Difficulty";

//img
import article_background from "../../images/article_background1.svg";
import bookmark_on from "../../images/bookmark_on.svg";
import bookmark_off from "../../images/bookmark-off.svg";

const TodayArticle = () => {
    const BookMarkOk = false;
    return (
        <Box>
            {BookMarkOk ? (
                <BookMark src={bookmark_on} />
            ) : (
                <BookMark src={bookmark_off} />
            )}
            <Picture src={article_background} />
            <TitleBox>
                <Title>제로 슈거와 아스파탐의 죄수?!</Title>
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        width: "113px",
                    }}
                >
                    <TagBox>
                        <Tag>#라이프</Tag>
                        <Tag>#건강</Tag>
                    </TagBox>
                    <Difficulty size="small" difficulty="light">
                        light
                    </Difficulty>
                </div>
            </TitleBox>
        </Box>
    );
};

export default TodayArticle;

const Box = styled.div`
    position: relative;
    width: 133px;
    height: 171px;
    overflow: hidden;

    margin-right: 15px;

    border-radius: 10px;
    border: 1px solid #353646;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const BookMark = styled.img`
    width: 24px;
    height: 24px;

    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
`;

const Picture = styled.img`
    width: 100%;
    object-fit: cover;
`;

const TitleBox = styled.div`
    /* position: relative;
    z-index: 10; */

    display: flex;
    width: 113.2px;
    height: 48.4px;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex-shrink: 0;

    background: #2b2c3f;
`;

const Title = styled.div`
    height: 29.7px;
    align-self: stretch;

    overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
`;

const TagBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const Tag = styled.div`
    color: rgba(255, 255, 255, 0.5);
    font-family: "Pretendard";
    font-size: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: 500;
`;
