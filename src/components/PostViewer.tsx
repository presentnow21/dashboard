// const EditorForm = () => {
//   const htmlForm = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//   return <div dangerouslySetInnerHTML={{ __html: htmlForm }}></div>;
// };

// import draftToHtml from 'draftjs-to-html';
// import { convertToRaw } from 'draft-js';
// import React from 'react';

// export default function EditorForm() {
//   const htmlStr = '<p><strong>안녕</strong></p>';
//   // const htmlForm = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//   // return <div dangerouslySetInnerHTML={{ __html: htmlForm }}></div>;
//   return <div dangerouslySetInnerHTML={{ __html: htmlStr }}></div>;
// }

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { Element } from 'html-react-parser';

function parseInlineStyle(style?: string): { [key: string]: string } | null {
  if (!style) return null;
  const template = document.createElement('template');
  template.setAttribute('style', style);
  return Object.entries(template.style)
    .filter(([key]) => !/^[0-9]+$/.test(key))
    .filter(([, value]) => Boolean(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export default function PostViewer({ content }: { content: string }) {
  const [mark, setMark] = useState<string | JSX.Element | JSX.Element[]>();

  useEffect(() => {
    const str = parse(content, {
      replace(domNode) {
        const node = domNode as Element;
        const tagName = node.tagName;
        if (tagName === 'img') {
          const imgStyle = node.attribs.style;
          const mystyle = parseInlineStyle(imgStyle);
          return (
            <Image
              style={mystyle ?? {}}
              src={node.attribs.src}
              alt="image"
              width={
                mystyle?.width ? parseInt(mystyle.width.replace('px', '')) : 300
              }
              height={
                mystyle?.height
                  ? parseInt(mystyle.height.replace('px', ''))
                  : 300
              }
            />
          );
        }
      },
    });
    setMark(str);
  }, [content]);
  return <div className="prose">{mark}</div>;
}
