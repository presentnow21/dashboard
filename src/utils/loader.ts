'use client';

type Props = {
  src: string;
  width: number;
  quality?: number;
};

export default function myImageLoader({ src, width, quality }: Props) {
  console.log('==', process);
  // const str = `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  const str = `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`;
  console.log('loader : ', str);
  return str;
}
