'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link2,
  Undo2,
  Redo2,
} from 'lucide-react';

/**
 * Lightweight WYSIWYG editor (TipTap) used for the package overview and each
 * day's itinerary text. Emits HTML, which is stored verbatim and rendered inside
 * a `prose` container on the public site.
 */
export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      LinkExtension.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener' } }),
    ],
    content: value || '',
    // Defer first render to the client to avoid Next SSR hydration mismatches.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none min-h-[150px] px-3 py-2 focus:outline-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return <div className="border rounded-lg h-[190px] bg-slate-50 animate-pulse" aria-hidden />;
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#0b3e63]/20 focus-within:border-[#0b3e63]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      {placeholder && editor.isEmpty && (
        <p className="px-3 pb-2 -mt-2 text-sm text-slate-400 pointer-events-none">{placeholder}</p>
      )}
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const Btn = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded-md transition-colors ${
        active ? 'bg-[#0b3e63] text-white' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', prev || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50 px-2 py-1.5">
      <Btn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="w-4 h-4" />
      </Btn>
      <Btn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="w-4 h-4" />
      </Btn>
      <span className="w-px h-5 bg-slate-200 mx-1" />
      <Btn
        title="Heading"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </Btn>
      <Btn
        title="Subheading"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="w-4 h-4" />
      </Btn>
      <span className="w-px h-5 bg-slate-200 mx-1" />
      <Btn title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="w-4 h-4" />
      </Btn>
      <Btn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="w-4 h-4" />
      </Btn>
      <Btn title="Link" active={editor.isActive('link')} onClick={setLink}>
        <Link2 className="w-4 h-4" />
      </Btn>
      <span className="w-px h-5 bg-slate-200 mx-1" />
      <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="w-4 h-4" />
      </Btn>
      <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="w-4 h-4" />
      </Btn>
    </div>
  );
}
