'use client';
import React, { useState } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { ToolBarProps } from '../editor/Toolbar';
import Image, { ImageLoaderProps } from 'next/image';
import ImagePicker from '../editor/ImagePicker';

type PhotoToolItemProp = ToolBarProps & {
  classname?: string;
  // uploadImage: () => void;
};

export default function AddPhoto({
  editor,
  classname,
}: // uploadImage,
PhotoToolItemProp) {
  const [modal, setModal] = useState(false);
  // const [files, setFiles] = useState<FileList | null>(null);
  // const [previewImgSrc, setPreviewImgSrc] = useState<string | null>(null);
  const handleFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const prompt = window.prompt('사이즈를 입력하세요');
    const { files } = ev.target;
    if (files == null) return;
    const formData = new FormData();
    if (files.length === 1) {
      // formData.append('file', files[0]);
      formData.append('file', files[0]);
      // formData.append('title', 'title');
    } else {
      Array.from(files).forEach((file) => {
        formData.append(file.name, file);
      });
      // formData.append('files', files);
      // formData.append('title', 'title');
    }
    // const formData = new FormData();
    // formData.append('file', files[0]);
    // formData.append('title', 'title');
    // const res = await fetch('http://localhost:8080/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
    const res = await fetch('/api/post/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      console.log('img url : ', url);
      // editor?.commands.setImage({ src: url });
      // editor?.chain().focus().setImage({ src: url });

      // width, height 입력 받아서 img 의 style에 동적으로 설정한다.
      url.forEach((url: string) => {
        editor?.commands.setContent(
          editor.getText() + `<img src="${url}" style="width:400px;"/>`
        );
      });
      // editor?.commands.setContent(
      //   editor.getText() + `<img src="${url}" style="width:400px;"/>`
      // );
      ev.target.files = null;
    }
  };

  const appendImage = async (
    width: string,
    height: string,
    defaultSize: boolean,
    files: FileList
  ) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append(file.name, file);
    });
    formData.append('width', width);
    formData.append('quality', '');

    const res = await fetch('/api/post/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();

      // width, height 입력 받아서 img 의 style에 동적으로 설정한다.
      url.forEach(async (url: string) => {
        const imgElementStr = defaultSize
          ? `<img src="${url}" style="width:300px"/>`
          : `<img src="${url}" style="${width && `width:${width}px;`}${
              height && `height:${height}px`
            }"/>`;

        editor?.commands.setContent(editor.getHTML() + imgElementStr);
      });
    }
  };

  // const handlePrevImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
  //   const { files } = ev.target;
  //   if (!files) return;
  //   if (files.length) {
  //     setFiles(files);
  //     const url = await fileToBase64(files[0]);
  //     setPreviewImgSrc(url);
  //   }
  // };

  return (
    <div className="relative">
      <ImagePicker
        modal={modal}
        setModal={setModal}
        appendImage={appendImage}
      />

      <div onClick={() => setModal(true)}>
        <IoMdPhotos className={`${classname || 'w-6 h-6'}`} />
      </div>

      {/* <label htmlFor="upload_image">
        <IoMdPhotos className={`${classname || 'w-6 h-6'}`} />
      </label>
      <input
        multiple
        onChange={handleFile}
        accept="image/*"
        type="file"
        name="file"
        id="upload_image"
        className="hidden"
      /> */}
    </div>
  );
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${process.env.NEXT_PUBLIC_ENV_API_DOMAIN}/${src}?w=${width}&q=${
    quality || 75
  }`;
};
