import type { HTMLConverter } from './lexical/types'

import { HeadingHTMLConverter } from './lexical/converters/heading'
import { LinebreakHTMLConverter } from './lexical/converters/linebreak'
import { LinkHTMLConverter } from './lexical/converters/link'
import { ListHTMLConverter, ListItemHTMLConverter } from './lexical/converters/list'
import { ParagraphHTMLConverter } from './lexical/converters/paragraph'
import { QuoteHTMLConverter } from './lexical/converters/quote'
import { TextHTMLConverter } from './lexical/converters/text'

export const defaultHTMLConverters: HTMLConverter[] = [
  ParagraphHTMLConverter,
  TextHTMLConverter,
  LinebreakHTMLConverter,
  LinkHTMLConverter,
  HeadingHTMLConverter,
  QuoteHTMLConverter,
  ListHTMLConverter,
  ListItemHTMLConverter,
]