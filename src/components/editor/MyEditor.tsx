'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import React, { useCallback, useEffect, useState } from 'react';
import TiptapToolbar from './Toolbar';
import { useRouter } from 'next/navigation';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from 'tiptap-extension-font-size';
import { Color } from '@tiptap/extension-color';
import Header from './Header';
import { useAppSelector } from '@/redux/store';
import { Post } from '../PostsList';

type Props = {
  postId?: string;
  post?: Post;
};

const CustomImage = Image.extend({
  addAttributes() {
    return {
      class: {
        renderHTML: (attributes) => {
          return {
            class: `${attributes.class}`,
          };
        },
      },
      style: {
        renderHTML: (attributes) => {
          return {
            style: `${attributes.style || ''}`,
          };
        },
      },
      src: {
        renderHTML: (attributes) => {
          return {
            src: `${attributes.src || ''}`,
          };
        },
      },
    };
  },
});

export default function MyEditor({ postId, post }: Props) {
  const userId = useAppSelector(({ auth }) => auth.user.id);
  const [title, setTitle] = useState('');
  const router = useRouter();
  const editor = useEditor({
    extensions: [
      StarterKit,
      underline,
      TextStyle,
      FontSize,
      Color,
      CustomImage.configure({
        allowBase64: true,
      }),
    ],
    // content:
    //   '<p class="text-red-400 text-sm" style="color:red">Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class:
          'bg-neutral-300 py-3 overflow-auto h-[300px] lg:h-[500px] 2xl:h-[700px] p-2',
      },
    },
    autofocus: true,
    editable: true,
  });

  const handleSave = useCallback(async () => {
    const res = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content: editor?.getHTML(), userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      router.push('/');
    }
  }, [editor, router, title, userId]);

  const handleEdit = useCallback(async () => {
    const res = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content: editor?.getHTML() }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      router.push(`/post/${postId}`);
    }
  }, [editor, router, title, postId]);

  const handleInput = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      editor?.commands.setContent(post.content);
    } else {
      setTitle('');
      editor?.commands.setContent('');
    }
  }, [editor, post]);

  if (!editor) return null;
  return (
    <section className="flex flex-col gap-3 lg:">
      <Header
        isNew={!post}
        title={title}
        handleInput={handleInput}
        handleSave={handleSave}
        handleEdit={handleEdit}
      />
      <div className="grow flex flex-col h-full">
        <TiptapToolbar editor={editor} />
        <EditorContent
          className="prose-2xl w-full text-base grow mb-8"
          editor={editor}
        />
      </div>
    </section>
  );
}
