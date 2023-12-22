import { MdFormatStrikethrough } from 'react-icons/md';
import React from 'react';
import { ToolBarProps } from '../editor/Toolbar';

export default function TextThrough({
  editor,
  classname,
}: ToolBarProps & { classname?: string }) {
  return (
    <button onClick={() => editor?.chain().focus().toggleStrike().run()}>
      <MdFormatStrikethrough className={`${classname || 'w-6 h-6'}`} />
    </button>
  );
}
