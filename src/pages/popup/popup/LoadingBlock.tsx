import React from 'react';
import { cn } from '../../../../utils/cn';

export function Spin({ className = '' }) {
  return <svg className={cn(`animate-spin duration-700 h-[14px] w-[14px] text-indigo-600`, className)} width="48" height="48" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id="linearGradient-5">
        <stop stopColor="currentColor" stopOpacity="0" offset="0%">
        </stop>
        <stop stopColor="currentColor" stopOpacity="0.50" offset="39.9430698%">
        </stop>
        <stop stopColor="currentColor" offset="100%">
        </stop>
      </linearGradient>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <rect fillOpacity="0.01" fill="none" x="0" y="0" width="36" height="36">
      </rect>
      <path d="M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951" stroke="url(#linearGradient-5)" strokeWidth="4" strokeLinecap="round">
      </path>
    </g>
  </svg>
}


const LoadingBlock = ({ height = '30vh' }) => {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%', height, overflow: 'hidden',
    }}>
      <Spin></Spin>
    </div>
  );
};

export default LoadingBlock;
