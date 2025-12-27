import React from "react";

interface ArrowRightIconThreeProps {
  width?: number;
  height?: number;
  className?: string;
}

const ArrowRightIconThree = ({ width = 21, height = 20, className = "" }: ArrowRightIconThreeProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      className={className}
    >
      <path
        d="M18.5766 10.2412C18.5449 10.3179 18.4992 10.3869 18.4417 10.4444L12.6084 16.2778C12.4867 16.3994 12.3267 16.4611 12.1667 16.4611C12.0067 16.4611 11.8466 16.4003 11.725 16.2778C11.4808 16.0336 11.4808 15.6377 11.725 15.3936L16.4916 10.6269H3C2.655 10.6269 2.375 10.3469 2.375 10.0019C2.375 9.65693 2.655 9.37693 3 9.37693H16.4908L11.7242 4.61029C11.48 4.36612 11.48 3.97026 11.7242 3.72609C11.9683 3.48193 12.3642 3.48193 12.6084 3.72609L18.4417 9.55943C18.4992 9.61693 18.5449 9.68601 18.5766 9.76267C18.6399 9.91601 18.6399 10.0879 18.5766 10.2412Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRightIconThree;
