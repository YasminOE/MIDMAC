'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import RtlText from './RtlText';

type RichTextNode = {
  text?: string;
  children?: RichTextNode[];
  type?: string;
};

type Props = {
  content: {
    root?: {
      children?: RichTextNode[];
    };
  };
  className?: string;
};

export const RichTextRtl: React.FC<Props> = ({ content, className = '' }) => {
  const searchParams = useSearchParams();
  const isArabic = searchParams?.get('locale') === 'ar';

  if (!content?.root?.children) return null;

  const renderNode = (node: RichTextNode): React.ReactNode => {
    if (node.text) {
      return <RtlText forceRtl={isArabic}>{node.text}</RtlText>;
    }

    if (node.children) {
      const children = node.children.map((child, index) => (
        <React.Fragment key={index}>
          {renderNode(child)}
        </React.Fragment>
      ));

      const containerStyle = isArabic ? {
        textAlign: 'right' as const
      } : {};

      switch (node.type) {
        case 'paragraph':
          return <p className={className} style={containerStyle}>{children}</p>;
        case 'heading':
          return <h2 className={className} style={containerStyle}>{children}</h2>;
        default:
          return <>{children}</>;
      }
    }

    return null;
  };

  return (
    <>
      {content.root.children.map((node, index) => (
        <React.Fragment key={index}>
          {renderNode(node)}
        </React.Fragment>
      ))}
    </>
  );
};

export default RichTextRtl; 