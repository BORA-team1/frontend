import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

//data
import {timeIntervalsData} from '../../data/timeIntervalsData';

const AudioContent = ({isAudioPlaying, audioRef, audio}) => {
  const [highlightedSectionIndex, setHighlightedSectionIndex] = useState(0);

  const {PostSec: sections} = audio;

  const timeIntervals = timeIntervalsData[audio.audio_id - 1];

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
        }
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
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
  const contentWrapperRef = useRef(null); // 스크롤을 조정할 요소를 참조
  useEffect(() => {
    // 하이라이트된 섹션이 변경될 때마다 스크롤 조정
    if (contentWrapperRef.current) {
      const sectionElement = contentWrapperRef.current.querySelector(
        `#section-${highlightedSectionIndex}`
      );
      if (sectionElement) {
        sectionElement.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [highlightedSectionIndex]);

  return (
    <Wrapper ref={contentWrapperRef}>
      {sections &&
        sections.length > 0 &&
        sections.map((sec, sectionIndex) => {
          const sentences = sec.content
            .split('·')
            .filter((paragraph) => paragraph.trim() !== '');
          return (
            <Gap key={sec.sec_id}>
              <Section
                id={`section-${sectionIndex}`}
                className='ebook-container'
              >
                {sec.title && (
                  <SectionTitle
                    className={
                      sectionIndex === highlightedSectionIndex
                        ? 'highlighted'
                        : ''
                    }
                  >
                    {sec.title}
                  </SectionTitle>
                )}
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
  margin-top: 20px;
  width: 390px;
  box-sizing: border-box;
  padding: 0px 30px;

  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 169.336%;
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-bottom: 20px;
  color: ${(props) => (props.isHighlighted ? '#A397FF' : 'white')};
`;

const SectionTitle = styled.div`
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 20px;

  &.highlighted {
    color: #a397ff;
  }
`;
