import { Footer as FooterType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

type Props = {
  Footer: FooterType
}

const payload = await getPayload({ config: configPromise })
const footer = await payload.findGlobal({
  slug: 'footer',
})

interface RichTextChild {
  text?: string;
  children?: RichTextChild[];
}

const Footer: React.FC<Props> = ({ Footer }) => {
  const footerText = ((Footer.text?.root?.children as RichTextChild[])?.[0]?.children?.[0]?.text) || '2024 MIDMAC. ALL RIGHTS RESERVED'

  return (
    <>
      <footer className="footer mt-4 mb-4">
        <div className="flex justify-center items-center">
          <p className="footer-text text-xs">
            {footerText}
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer


