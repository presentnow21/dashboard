import React from 'react';
import { FaItalic } from 'react-icons/fa';
import { ToolBarProps } from '../editor/Toolbar';

export default function FontBold({
  editor,
  classname,
}: ToolBarProps & { classname?: string }) {
  return (
    <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
      <FaItalic className={`${classname || 'w-6 h-6'}`} />
    </button>
  );
}
