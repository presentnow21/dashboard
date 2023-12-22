import React from 'react';
import { LuHeading2 } from 'react-icons/lu';
import { ToolBarProps } from '../editor/Toolbar';

export default function Heading1({
  editor,
  classname,
}: ToolBarProps & { classname?: string }) {
  return (
    <button
      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
    >
      <LuHeading2 className={`${classname || 'w-6 h-6'}`} />
    </button>
  );
}
