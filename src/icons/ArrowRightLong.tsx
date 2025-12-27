import React from "react";

interface ArrowRightLongProps {
  width?: number;
  height?: number;
  className?: string;
}

const ArrowRightLong: React.FC<ArrowRightLongProps> = ({
  width = 100,
  height = 7,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100 7"
      fill="none"
      className={className}
    >
      <path
        d="M100 3.5L95 0.613249V6.38675L100 3.5ZM0 4H95.5V3H0V4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRightLong;
