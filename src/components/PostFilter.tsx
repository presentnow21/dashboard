'use client';
import React, { useState } from 'react';
import Dropdown from './Dropdown';

type Props = {
  selectedOption: string;
  // setSelectedOption: (val: string) => void;
  handleFilter: (option: string, value: string) => void;
};

const PostFilter = ({ handleFilter }: Props) => {
  const [selectedOption, setSelectedOption] = useState('title');
  const [input, setInput] = useState('');
  const filterOptions = [
    { value: 'title', key: '제목만' },
    { value: 'author', key: '글작성자' },
  ];

  // const setValue = (val: string) => setSelectedOption(val);

  return (
    <div className="flex justify-center gap-2">
      {/* <Dropdown options={filterOptions} setValue={setValue} /> */}
      <Dropdown options={filterOptions} setValue={setSelectedOption} />
      <div className="w-[50%]">
        <input
          value={input}
          onChange={(ev) => setInput(ev.target.value)}
          type="text"
          className="px-2 border w-full h-full box-border outline-none rounded-md"
          name=""
          id=""
        />
      </div>
      <button
        onClick={() => handleFilter(selectedOption, input)}
        className="border rounded-md px-3"
      >
        검색
      </button>
    </div>
  );
};

export default React.memo(PostFilter);
