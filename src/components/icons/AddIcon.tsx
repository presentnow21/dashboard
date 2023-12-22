import React from 'react';
import { IoMdAdd } from 'react-icons/io';

export type IconProps = {
  classname?: string;
};

export default function AddIcon({ classname }: IconProps) {
  return <IoMdAdd className={classname || 'w-5 h-5'} />;
}
