import React from 'react';
import { LuHeading1 } from 'react-icons/lu';
import { ToolBarProps } from '../editor/Toolbar';

export default function Heading1({
  editor,
  classname,
}: ToolBarProps & { classname?: string }) {
  return (
    <button
      onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
    >
      <LuHeading1 className={`${classname || 'w-6 h-6'}`} />
    </button>
  );
}
