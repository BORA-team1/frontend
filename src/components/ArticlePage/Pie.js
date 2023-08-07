import React from 'react';

const datas = [
  {color: '#2B99FF', ratio: 0.689},
  {color: '#FFDD2B', ratio: 0.175},
  {color: '#FF5E2B', ratio: 0.136},
];

const Pie = () => {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  let filled = 0;

  return (
    <div>
      <svg viewBox='0 0 100 100' width={66.268} height={66.268}>
        {datas.map(({color, ratio}) => {
          const strokeLength = circumference * ratio;
          const spaceLength = circumference - strokeLength;
          const offset = filled * circumference;
          filled += ratio;

          return (
            <circle
              r={radius}
              cx={50}
              cy={50}
              fill='transparent'
              stroke={color}
              strokeWidth={radius * 2}
              strokeDasharray={`${strokeLength.toFixed(
                2
              )} ${spaceLength.toFixed(2)}`}
              strokeDashoffset={-offset}
              transform='rotate(-90, 50, 50)'
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Pie;
