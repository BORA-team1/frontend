import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

//context
import { useAuth } from "../../contexts/AuthContext";

const AudioContent = ({ isAudioPlaying, audioRef, audio }) => {
  const [highlightedSectionIndex, setHighlightedSectionIndex] = useState(0);

  // const sections = audio.reduce((acc, item) => {
  //   if (item.audio_id === 1) {
  //     acc.push(...item.PostSec);
  //   }
  //   return acc;
  // }, []);

  const { PostSec: sections } = audio;

  const timeIntervals = [
    { start: 0, end: 3, sectionId: 1 },
    { start: 3, end: 6, sectionId: 2 },
    { start: 6, end: 9, sectionId: 3 },
    { start: 9, end: 12, sectionId: 4 },
    { start: 12, end: 16, sectionId: 5 },
    { start: 16, end: 35, sectionId: 6 },

    // ... 필요한 만큼 더 간격 정의
  ];

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (isAudioPlaying) {
        const currentTime = getCurrentAudioTime();
        const newSectionIndex = calculateSectionIndexFromTime(
          currentTime,
          timeIntervals
        );

        if (newSectionIndex !== highlightedSectionIndex) {
          setHighlightedSectionIndex(newSectionIndex);
          console.log(newSectionIndex);
        }
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [isAudioPlaying, audioRef, timeIntervals]);

  const getCurrentAudioTime = () => {
    return audioRef.current ? audioRef.current.currentTime : 0;
  };

  const calculateSectionIndexFromTime = (currentTime, timeIntervals) => {
    const matchingInterval = timeIntervals.find(
      (interval) => currentTime >= interval.start && currentTime <= interval.end
    );

    return matchingInterval ? matchingInterval.sectionId - 1 : 0;
  };

  //스크롤 관련 함수

  return (
    <Wrapper>
      {sections &&
        sections.length > 0 &&
        sections.map((sec, sectionIndex) => {
          const sentences = sec.content
            .split("·")
            .filter((paragraph) => paragraph.trim() !== "");
          return (
            <Gap key={sec.sec_id}>
              <Section
                id={`section-${sectionIndex}`}
                className="ebook-container"
              >
                <SectionContent>
                  <TextContainer>
                    {sentences.map((sentence, sentenceIndex) => (
                      <HighlightedSpan
                        key={sentenceIndex}
                        isHighlighted={sectionIndex === highlightedSectionIndex}
                      >
                        {sentence}
                      </HighlightedSpan>
                    ))}
                  </TextContainer>
                </SectionContent>
              </Section>
            </Gap>
          );
        })}
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

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
  width: 360px;
`;

const HighlightedSpan = styled.div`
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
