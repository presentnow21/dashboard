import React from 'react';
import { LuHeading4 } from 'react-icons/lu';
import { ToolBarProps } from '../editor/Toolbar';

export default function Heading1({
  editor,
  classname,
}: ToolBarProps & { classname?: string }) {
  return (
    <button
      onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
    >
      <LuHeading4 className={`${classname || 'w-6 h-6'}`} />
    </button>
  );
}
