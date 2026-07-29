'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white/[0.02] border-b border-white/10 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('bold') ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        Kalın
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('italic') ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        İtalik
      </button>
      <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        H2
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        H3
      </button>
      <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('bulletList') ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        Liste
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('orderedList') ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        Numaralı
      </button>
      <button
        onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editor.isActive('blockquote') ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        Alıntı
      </button>
      <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>
      <button
        onClick={(e) => {
          e.preventDefault();
          const url = window.prompt('Görsel URL:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
      >
        Görsel Ekle
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-6 border border-white/10 shadow-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-400 underline underline-offset-4 hover:text-brand-300 transition-colors',
        },
      }),
      Placeholder.configure({
        placeholder: 'Yazınızı buraya yazmaya başlayın...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-brand max-w-none focus:outline-none min-h-[400px] p-6 text-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-white/10 rounded-xl bg-white/[0.01] overflow-hidden focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/50 transition-all duration-300">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="cursor-text max-h-[600px] overflow-y-auto custom-scrollbar" />
    </div>
  );
}
