import React from "react";

export const Liked = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.1585 25.7786L25.5074 35L28.1805 29.8476L34 30.1197L28.6511 20.8982M10.3489 20.4545L5 29.676L10.8195 29.404L13.4926 34.5563L18.8415 25.3349M29.4687 15C29.4687 20.5228 25.0056 25 19.5 25C13.9944 25 9.53124 20.5228 9.53124 15C9.53124 9.47715 13.9944 5 19.5 5C25.0056 5 29.4687 9.47715 29.4687 15Z"
      stroke="#474747"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UnLiked = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.1585 25.7786L25.5074 35L28.1805 29.8476L34 30.1197L28.6511 20.8982M10.3489 20.4545L5 29.676L10.8195 29.404L13.4926 34.5563L18.8415 25.3349M29.4687 15C29.4687 20.5228 25.0056 25 19.5 25C13.9944 25 9.53124 20.5228 9.53124 15C9.53124 9.47715 13.9944 5 19.5 5C25.0056 5 29.4687 9.47715 29.4687 15Z"
      stroke="#C5C5C5"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
