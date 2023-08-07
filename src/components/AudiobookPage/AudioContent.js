import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AudioContent = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [highlightTimeout, setHighlightTimeout] = useState(null);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // 임시 데이터
    const longTexts = [
        {
            id: 1,
            content: `혹시 요즘 아스파탐 논란 보고 ‘제로슈거 음료 안 마시는 게 낫나?’ 고민한 사람 있나요?? 아스파탐 진짜 위험한 건지, 시원하게 하나씩 팩트체크 해볼게요.`,
        },
        {
            id: 2,
            content: `요새 설탕 뺀 제로슈거 음료, 저칼로리 과자 같은 거 진짜 많잖아요. 이때 설탕 대신 넣는 인공 감미료 중 하나예요. 설탕보다 200배 단맛을 내는데 값도 싸고 칼로리도 거의 없어 인기가 많았어요. 우리나라를 포함해 전 세계 200여 개 나라에서 승인받아 사용돼 왔고요. 그런데 얼마 전, ‘세계보건기구 아래 있는 국제암연구소가 아스파탐을 발암 가능 물질로 분류할 것’이라는 언론 보도가 나왔어요.`,
        },
    ];

    // 문장 순차적으로 하나씩 하이라이트 표시
    const startHighlighting = () => {
        let sentenceIndex = 0;

        const highlightNext = () => {
            if (highlightTimeout) {
                clearTimeout(highlightTimeout);
            }

            setHighlightedIndex(sentenceIndex);

            if (
                sentenceIndex <
                longTexts[currentTextIndex].content.length - 1
            ) {
                sentenceIndex++;
                setHighlightTimeout(
                    setTimeout(() => {
                        highlightNext();
                    }, 3000) // 3초 후 다음 문장 하이라이트 표시
                );
            } else if (currentTextIndex < longTexts.length - 1) {
                setCurrentTextIndex(currentTextIndex + 1);
                sentenceIndex = 0;
                setHighlightTimeout(
                    setTimeout(() => {
                        highlightNext();
                    }, 3000) // 3초 후 다음 문장 하이라이트 표시
                );
            }
        };

        highlightNext();
    };

    useEffect(() => {
        return () => {
            if (highlightTimeout) {
                clearTimeout(highlightTimeout);
            }
        };
    }, [highlightTimeout]);

    return (
        <Wrapper>
            {longTexts.map((longText, index) => {
                const sentences = longText.content.split(/\. |\? /);
                return (
                    <Section key={index} className="ebook-container">
                        <SectionContent>
                            <TextContainer>
                                {sentences.map((sentence, sentenceIndex) => (
                                    <HighlightedSpan
                                        key={sentenceIndex}
                                        isHighlighted={
                                            currentTextIndex === index &&
                                            highlightedIndex === sentenceIndex
                                        }
                                    >
                                        {sentence.trim()}
                                        {sentenceIndex < sentences.length - 1 &&
                                            ((sentence.slice(-1) === "?" &&
                                                " ") ||
                                                (sentence.slice(-1) !== "?" &&
                                                    ". "))}
                                    </HighlightedSpan>
                                ))}
                            </TextContainer>
                        </SectionContent>
                    </Section>
                );
            })}
            <Button onClick={startHighlighting}>시작</Button>
        </Wrapper>
    );
};

export default AudioContent;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 37.4px;
    gap: 50px;

    color: white;
    font-family: "Pretendard-Regular";
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 169.336%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const SectionContent = styled.div`
    display: flex;
    flex-direction: row;
`;

const TextContainer = styled.div`
    width: ${(props) => (props.isContentson ? "330px" : "345px")};
`;

const HighlightedSpan = styled.span`
    cursor: pointer;
    color: ${(props) => (props.isHighlighted ? "#A397FF" : "white")};
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #a397ff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
`;
