import React from 'react';

interface QuoteIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const QuoteIcon: React.FC<QuoteIconProps> = ({ 
  className = "", 
  width = 60, 
  height = 60 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
    >
      <path
        d="M59.4667 34.4197L50.9 51.596C50.3333 52.7344 49.1667 53.4375 47.9333 53.4375H39.3667C38.1333 53.4375 37.3333 52.1317 37.8667 51.0268L46.6667 33.3482H38.3333C35.5667 33.3482 33.3333 31.1049 33.3333 28.3259V11.5848C33.3333 8.8058 35.5667 6.5625 38.3333 6.5625H55C57.7667 6.5625 60 8.8058 60 11.5848V32.1763C60 32.9464 59.8333 33.7165 59.4667 34.4197ZM26.6667 32.1763V11.5848C26.6667 8.8058 24.4333 6.5625 21.6667 6.5625H5C2.23333 6.5625 0 8.8058 0 11.5848V28.3259C0 31.1049 2.23333 33.3482 5 33.3482H13.3333L4.53334 51.0268C3.96667 52.1317 4.79999 53.4375 6.03333 53.4375H14.6C15.8667 53.4375 17.0333 52.7344 17.5667 51.596L26.1333 34.4197C26.4667 33.7165 26.6667 32.9464 26.6667 32.1763Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default QuoteIcon;
