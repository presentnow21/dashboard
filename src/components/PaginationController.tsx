'use client';
import React, { useMemo } from 'react';

type Props = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
};

export default function PaginationController({
  page,
  totalPage,
  setPage,
}: Props) {
  const pages = useMemo(
    () => Array.from({ length: totalPage + 1 }, (_, x) => x).slice(1),
    [totalPage]
  );
  return (
    <ul className="flex gap-3 justify-center mt-5">
      {pages.map((number) => (
        <li key={number}>
          <button
            onClick={(ev) => setPage(number)}
            className={`${page == number ? 'text-neutral-300' : 'text-black'}`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}
