import * as React from "react";

const Arrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="40"
    height="30"
    viewBox="0 0 40 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.2093 11.1885C34.1278 13.2898 37.66 14 40 14V16C37.66 16 34.1278 16.7102 31.2093 18.8115C28.3418 20.8761 26 24.3259 26 30H24C24 23.6741 26.6582 19.6239 30.0407 17.1885C30.6675 16.7372 31.3168 16.3428 31.9757 16H0V14H31.9757C31.3168 13.6572 30.6675 13.2628 30.0407 12.8115C26.6582 10.3761 24 6.32592 24 0H26C26 5.67408 28.3418 9.12386 31.2093 11.1885Z"
      fill="#0F0F0F"
    />
  </svg>
);

export default Arrow;
