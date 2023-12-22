import React from 'react';
import { FaUnderline } from 'react-icons/fa';
import { ToolBarProps } from '../editor/Toolbar';

export default function FontBold({
  editor,
  classname,
}: ToolBarProps & { classname?: string }) {
  return (
    <button onClick={() => editor?.commands.toggleUnderline()}>
      <FaUnderline className={`${classname || 'w-6 h-6'}`} />
    </button>
  );
}
