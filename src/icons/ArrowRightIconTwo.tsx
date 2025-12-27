import React from "react";

interface ArrowRightIconTwoProps {
  width?: number;
  height?: number;
  className?: string;
}

const ArrowRightIconTwo = ({ width = 20, height = 20, className = "" }: ArrowRightIconTwoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M18.0766 10.2412C18.0449 10.3179 17.9992 10.3869 17.9417 10.4444L12.1084 16.2778C11.9867 16.3994 11.8267 16.4611 11.6667 16.4611C11.5067 16.4611 11.3466 16.4003 11.225 16.2778C10.9808 16.0336 10.9808 15.6377 11.225 15.3936L15.9916 10.6269H2.5C2.155 10.6269 1.875 10.3469 1.875 10.0019C1.875 9.65693 2.155 9.37693 2.5 9.37693H15.9908L11.2242 4.61029C10.98 4.36612 10.98 3.97026 11.2242 3.72609C11.4683 3.48193 11.8642 3.48193 12.1084 3.72609L17.9417 9.55943C17.9992 9.61693 18.0449 9.68601 18.0766 9.76267C18.1399 9.91601 18.1399 10.0879 18.0766 10.2412Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRightIconTwo;
