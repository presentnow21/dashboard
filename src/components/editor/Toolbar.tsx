import React from 'react';
import { Editor } from '@tiptap/react';
import Heading1 from '../icons/Heading1';
import Heading2 from '../icons/Heading2';
import Heading3 from '../icons/Heading3';
import Heading4 from '../icons/Heading4';
import FontBold from '../icons/FontBold';
import FontItalic from '../icons/FontItalic';
import TextUnderline from '../icons/TextUnderline';
import TextThrough from '../icons/TextThrough';
import AddPhoto from '../icons/AddPhoto';
import FontDropdown from './FontDropdown';
import ColorPicker from './ColorPicker';

export type ToolBarProps = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: ToolBarProps) => {
  if (!editor) return null;

  return (
    <div className=" mb-6 w-full flex items-center justify-center gap-2 p-6 py-3 sm:gap-8">
      <div className="flex items-center justify-center gap-2">
        <Heading1 editor={editor} />
        <Heading2 editor={editor} />
        <Heading3 editor={editor} />
        <Heading4 editor={editor} />
        <FontDropdown editor={editor} />
        <ColorPicker editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <FontBold editor={editor} />
        <FontItalic editor={editor} />
        <TextUnderline editor={editor} />
        <TextThrough editor={editor} />
      </div>

      <div className="flex items-center justify-center gap-2">
        <AddPhoto editor={editor} />
      </div>
    </div>
  );
};

export default React.memo(Toolbar);
