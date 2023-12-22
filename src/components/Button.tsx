'use client';

import React from 'react';
type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: Props) {
  return <button onClick={() => onClick()}>{children}</button>;
}
