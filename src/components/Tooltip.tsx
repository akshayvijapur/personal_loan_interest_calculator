import React from 'react';

interface Props {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: Props) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded py-1 px-2 -top-2 left-full ml-2 w-48">
        {content}
        <div className="absolute -left-1 top-1/2 -mt-1 border-4 border-transparent border-r-gray-900"></div>
      </div>
    </div>
  );
}