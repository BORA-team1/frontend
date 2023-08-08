import styled from "styled-components";

const Audiobook = () => {
    const time = 13; //임의지정 props
    return (
        <Box>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title>제로 슈거와 아스파탐의 죄수</Title>
                <Del>삭제</Del>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}
            >
                <div style={{ display: "flex" }}>
                    <Difficulty>LIght</Difficulty>
                    {/* //나중에 state로,, */}
                    <TagBox>
                        <Tag>#건강</Tag>
                        <Tag>#라이프</Tag>
                    </TagBox>
                </div>
                <Time>{time}분</Time>
            </div>
        </Box>
    );
};

export default Audiobook;

const Box = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px 1.5px;

    width: 346px;
    height: 37px;

    border-bottom: 0.7px solid rgba(252, 252, 252, 0.3);
`;

const Font = styled.div`
    color: #fff;
    font-family: "Pretendard-Regular";
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.22px;
`;

const Title = styled(Font)`
    height: 15px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 500;
`;

const Del = styled(Font)`
    color: rgba(255, 255, 255, 0.5);
    text-align: right;
    font-size: 12px;
    font-weight: 600;
`;

const TagBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const Tag = styled(Font)`
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 300;
    margin-left: 10px;
`;

const Difficulty = styled(Font)`
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 300;
`;

const Time = styled(Font)`
    color: rgba(255, 255, 255, 0.6);
    text-align: right;
    font-size: 15px;
    font-weight: 400;
`;
