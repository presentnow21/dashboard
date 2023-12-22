'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  modal: boolean;
  setModal: (show: boolean) => void;
  appendImage: (
    width: string,
    height: string,
    defaultSize: boolean,
    files: FileList
  ) => void;
};

type ImageSize = {
  width: string;
  height: string;
};

export default function ImagePicker({ modal, setModal, appendImage }: Props) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImgSrc, setPreviewImgSrc] = useState<string | null>(null);
  const [size, setSize] = useState<ImageSize>({ width: '200', height: '200' });
  const [defaultSize, setDefaultSize] = useState(false);
  const handlePrevImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = ev.target;
    if (!files) return;
    if (files.length) {
      setFiles(files);
      const url = await fileToBase64(files[0]);
      setPreviewImgSrc(url);
    }
  };

  const handleAppend = () => {
    if (
      !files ||
      !files.length ||
      (!defaultSize && (!size.width || !size.height))
    )
      return;
    appendImage(size.width, size.height, defaultSize, files);
    setModal(false);
    setSize({ width: '200', height: '200' });
    setFiles(null);
    setPreviewImgSrc('');
  };

  const handleSizeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setSize((prev) => ({ ...prev, [name]: value }));
  };

  const clearState = useCallback(() => {
    setSize({ width: '200', height: '200' });
    setFiles(null);
    setPreviewImgSrc('');
  }, []);

  useEffect(() => {
    console.log('modal', modal);
    if (!modal) {
      clearState();
    }
  }, [modal, clearState]);

  return (
    <section
      className={`p-5 w-44 absolute top-[100%] z-20 bg-white shadow-md ${
        modal ? 'block' : 'hidden'
      }`}
    >
      <button
        onClick={() => setModal(false)}
        className="absolute top-0 right-2"
      >
        x
      </button>
      <div className="mb-2">
        <input
          onChange={handlePrevImages}
          className="hidden"
          type="file"
          name="file"
          id="uploadImage"
          multiple
          accept="image/*"
        />
        <label
          htmlFor="uploadImage"
          className="relative w-full h-28 bg-neutral-100 text-xs flex items-center justify-center"
        >
          {!previewImgSrc && <span>이미지를 선택하세요</span>}
          <div className="absolute w-full h-full">
            {previewImgSrc && (
              <Image
                className="w-full h-full"
                src={previewImgSrc}
                alt="preview image"
                width={100}
                height={100}
              />
            )}
          </div>
        </label>
      </div>

      <div className="w-full flex gap-2">
        <input
          min={1}
          disabled={defaultSize}
          value={size.width}
          onChange={handleSizeInput}
          name="width"
          type="number"
          className="border rounded-md outline-none w-[50%]"
        />
        <input
          min={1}
          disabled={defaultSize}
          name="height"
          value={size.height}
          onChange={handleSizeInput}
          type="number"
          className="border rounded-md outline-none w-[50%]"
        />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="default"
          id="defaultSize"
          checked={defaultSize}
          onChange={(ev) => setDefaultSize(ev.target.checked)}
        />
        <label htmlFor="defaultSize" className="text-xs">
          원본 크기로 업로드
        </label>
      </div>
      <button
        onClick={handleAppend}
        className="mt-2 w-full border text-center rounded-md"
      >
        upload
      </button>
    </section>
  );
}

function fileToBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(null);
  });
}
