'use client';
import React, { useState } from 'react';
import { ToolBarProps } from './Toolbar';

export default function ColorPicker({ editor }: ToolBarProps) {
  const [color, setColor] = useState('#000000');
  const handleColor = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = ev.target.value;
    editor?.commands.setColor(selectedColor);
    setColor(selectedColor);
  };
  return (
    <div className="flex justify-center space-x-2">
      <input
        id="nativeColorPicker1"
        type="color"
        value={color}
        onChange={handleColor}
      />
      {/* <button
        id="burronNativeColor"
        type="button"
        className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
      >
        Button
      </button> */}
    </div>
  );
}
