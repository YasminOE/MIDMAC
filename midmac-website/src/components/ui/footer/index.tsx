'use client'

import React from 'react'

interface FooterText {
  root: {
    children: Array<{
      type: string;
      version: number;
      children?: Array<{
        text: string;
        [key: string]: unknown;
      }>;
      [key: string]: unknown;
    }>
  }
}

type Props = {
  Footer: {
    text?: FooterText
  }
}

const Footer: React.FC<Props> = ({ Footer }) => {
  const year = new Date().getFullYear()
  const rawText = Footer.text?.root?.children?.[0]?.children?.[0]?.text || `${year} MIDMAC. ALL RIGHTS RESERVED`
  const footerText = rawText.replace(/\b(20\d{2})\b/, String(year))

  return (
    <footer className="footer mt-4 mb-4">
      <div className="flex justify-center items-center">
        <p className="footer-text text-xs">
          {footerText}
        </p>
      </div>
    </footer>
  )
}

export default Footer


