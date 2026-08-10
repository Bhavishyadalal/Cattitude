import React from "react";

export const CatIcon = ({ className = "w-8 h-8", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 2.61-2.84 3-3 .28 0 .5.22.5.5 0 1.5-1.5 4-1.5 4 2.5 1.5 4 4.5 4 7.5 0 4.5-4.5 9-10 9S2 18.5 2 14c0-3 1.5-6 4-7.5 0 0-1.5-2.5-1.5-4 0-.28.22-.5.5-.5.39.16 1.22 1 3 3 .65-.17 1.33-.26 2-.26Z" />
      <path d="M8 14s.5 1 2 1 2-1 2-1" />
      <path d="M14 14s.5 1 2 1 2-1 2-1" />
      <circle cx="9" cy="11.5" r=".5" fill={color} />
      <circle cx="15" cy="11.5" r=".5" fill={color} />
      <path d="M12 13v.5" />
    </svg>
  );
};
