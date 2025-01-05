'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  forceRtl?: boolean;
  className?: string;
};

export const RtlText: React.FC<Props> = ({ children, forceRtl = false, className = '' }) => {
  const searchParams = useSearchParams();
  const isArabic = searchParams?.get('locale') === 'ar' || forceRtl;

  return (
    <span 
      className={`${className} ${isArabic ? 'rtl-text' : ''}`}
      style={{ 
        textAlign: isArabic ? 'right' : 'inherit',
        display: 'block'
      }}
    >
      {children}
    </span>
  );
};

export default RtlText; 