'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt('YouTube Video Linkini Girin:');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt('640', 10)) || 640,
        height: Math.max(180, parseInt('480', 10)) || 480,
      });
    }
  };

  const activeClass = 'bg-brand-500/20 text-brand-600 dark:text-brand-400';
  const inactiveClass = 'text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5';
  
  const Btn = ({ onClick, disabled = false, isActive = false, icon, title }: any) => (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${isActive ? activeClass : inactiveClass} disabled:opacity-50`}
    >
      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span>
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-slate-300 dark:bg-white/10 mx-1 self-center"></div>;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
      {/* Format */}
      <Btn onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" title="Kalın" />
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" title="İtalik" />
      <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon="format_underlined" title="Altı Çizili" />
      <Btn onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon="format_strikethrough" title="Üstü Çizili" />
      <Btn onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} icon="format_ink_highlighter" title="Vurgula" />
      
      <div className="flex items-center ml-1 relative group cursor-pointer">
         <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-gray-400 mr-1 p-1" aria-hidden="true">format_color_text</span>
         <input
          type="color"
          onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
          title="Yazı Rengi"
        />
      </div>

      <Divider />

      {/* Headings */}
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon="format_h2" title="Başlık 2" />
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon="format_h3" title="Başlık 3" />
      
      <Divider />

      {/* Align */}
      <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon="format_align_left" title="Sola Hizala" />
      <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon="format_align_center" title="Ortala" />
      <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon="format_align_right" title="Sağa Hizala" />
      <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} icon="format_align_justify" title="İki Yana Yasla" />
      
      <Divider />

      {/* Lists */}
      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" title="Sırasız Liste" />
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon="format_list_numbered" title="Sıralı Liste" />
      <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} icon="checklist" title="Yapılacaklar Listesi" />
      <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" title="Alıntı" />

      <Divider />

      {/* Media & Table */}
      <Btn onClick={() => {
        const url = window.prompt('Görsel URL:');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }} icon="image" title="Görsel Ekle" />
      <Btn onClick={addYoutubeVideo} icon="smart_display" title="YouTube Video Ekle" />
      
      {/* Table Operations */}
      <Btn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon="table_chart" title="Tablo Ekle" />
      
      {editor.isActive('table') && (
        <div className="flex bg-brand-50 dark:bg-brand-500/10 rounded-lg ml-2 p-0.5 border border-brand-200 dark:border-brand-500/20">
          <Btn onClick={() => editor.chain().focus().addColumnBefore().run()} icon="border_left" title="Sola Sütun Ekle" />
          <Btn onClick={() => editor.chain().focus().addColumnAfter().run()} icon="border_right" title="Sağa Sütun Ekle" />
          <Btn onClick={() => editor.chain().focus().deleteColumn().run()} icon="border_vertical" title="Sütunu Sil" />
          <Btn onClick={() => editor.chain().focus().addRowBefore().run()} icon="border_top" title="Yukarı Satır Ekle" />
          <Btn onClick={() => editor.chain().focus().addRowAfter().run()} icon="border_bottom" title="Aşağı Satır Ekle" />
          <Btn onClick={() => editor.chain().focus().deleteRow().run()} icon="border_horizontal" title="Satırı Sil" />
          <Btn onClick={() => editor.chain().focus().deleteTable().run()} icon="delete" title="Tabloyu Sil" />
        </div>
      )}

      <div className="flex-1"></div>
      <button 
        onClick={(e) => { e.preventDefault(); editor.chain().focus().clearNodes().unsetAllMarks().run() }}
        className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
        title="Tüm biçimlendirmeyi temizle"
      >
        Temizle
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] }
      }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-6 border border-slate-200 dark:border-white/10 shadow-lg',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-xl overflow-hidden my-6 shadow-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-600 dark:text-brand-400 underline underline-offset-4 hover:text-brand-500 dark:hover:text-brand-300 transition-colors',
        },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: 'Yazınızı buraya yazmaya başlayın...' }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-slate dark:prose-invert prose-brand max-w-none focus:outline-none min-h-[400px] p-6 text-slate-900 dark:text-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/[0.01] overflow-hidden focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/50 transition-all duration-300">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="cursor-text max-h-[700px] overflow-y-auto custom-scrollbar" />
      <style jsx global>{`
        /* Tiptap özel stilleri (Tablolar, checklistler) */
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .ProseMirror td, .ProseMirror th {
          min-width: 1em;
          border: 1px solid var(--tw-prose-td-borders);
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: var(--tw-prose-th-bg);
        }
        .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }
        .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        .ProseMirror ul[data-type="taskList"] li > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }
        .ProseMirror ul[data-type="taskList"] li > div {
          flex: 1 1 auto;
        }
      `}</style>
    </div>
  );
}
