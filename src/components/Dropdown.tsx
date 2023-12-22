'use client';
import React, { useEffect, useRef, useState } from 'react';

export type DropdownProps = {
  // options: (string | number)[] | { key: string | number; value: string|number }[];
  options: { key: string | number; value: string | number }[];

  setValue: (val: string) => void;
};

export default function Dropdown({ options, setValue }: DropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  // const [selected, setSelected] = useState(options[0]);
  const [selected, setSelected] = useState(options[0].key);

  const selectValue = (ev: React.MouseEvent<HTMLLIElement>) => {
    if (!(ev.target instanceof HTMLLIElement)) return;
    const selectedValue = ev.target.dataset['value'];
    const selectedKey = ev.target.dataset['key'];
    if (!selectedValue || !selectedKey) return;
    setValue(selectedValue);
    setSelected(selectedKey);
    setShow(false);
  };

  const toggleMenu = () => {
    setShow((prv) => !prv);
  };

  useEffect(() => {
    document.addEventListener('click', (ev) => {
      const contained = menuRef.current?.contains(ev.target as HTMLElement);
      if (!contained) {
        setShow(false);
      }
    });
  }, []);
  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <div onClick={toggleMenu}>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {selected}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          show ? 'block' : 'hidden'
        } max-h-48 overflow-auto absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <ul className="py-1 w-full px-0 my-0" role="none">
          {/* {options.map((option) => (
            <li
              onClick={selectValue}
              key={option}
              data-value={option}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-neutral-200 cursor-pointer"
              role="menuitem"
              id="menu-item-0"
            >
              {option}
            </li>
          ))} */}
          {options.map(({ key, value }) => (
            <li
              onClick={selectValue}
              key={value}
              data-value={value}
              data-key={key}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-neutral-200 cursor-pointer"
              role="menuitem"
              id="menu-item-0"
            >
              {key}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
