import styled from "styled-components";

const InterestArticle = () => {
    return (
        <Box>
            <Title>제목이엄청나게길면이렇게됩니다</Title>
            <TagBox>
                <Tag>#태그1</Tag>
                <Tag>#태그2</Tag>
            </TagBox>
        </Box>
    );
};

export default InterestArticle;

const Box = styled.div`
    display: flex;
    padding: 13px 12px;
    margin-right: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    width: 94px;
    height: 32x;

    border-radius: 10px;
    border: 1px solid #353646;
    background: #242237;
`;

const Title = styled.div`
    width: 94px;
    height: 12px;

    overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "Pretendard";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
`;

const TagBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const Tag = styled.div`
    color: rgba(255, 255, 255, 0.5);
    font-family: "Pretendard";
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 10px */
`;
