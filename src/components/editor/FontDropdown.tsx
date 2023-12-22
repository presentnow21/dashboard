'use client';

import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import { ToolBarProps } from './Toolbar';

export default function FontDropdown({ editor }: ToolBarProps) {
  // const options = Array.from({ length: 40 }, (_, x) => x).slice(16);
  const options = Array.from({ length: 40 }, (_, x) => ({
    key: x,
    value: x,
  })).slice(16);

  return (
    <Dropdown
      options={options}
      setValue={(val: string) =>
        editor?.chain().focus().setFontSize(`${val}px`).run()
      }
    />
  );
}
