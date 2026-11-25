"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";

import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";

interface BlogEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function BlogEditor({
  initialContent = "",
  onChange,
  placeholder = "Start writing your story...",
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      UnderlineExtension,
    ],

    content: initialContent,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-75 px-4 py-4 outline-none focus:outline-none",
        "aria-label": "Blog content editor",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isEmpty: editor?.isEmpty ?? true,
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      underline: editor?.isActive("underline") ?? false,
      strike: editor?.isActive("strike") ?? false,
    }),
  });

  if (!editor) {
    return (
      <div className="min-h-75 animate-pulse rounded-lg bg-muted" />
    );
  }

  const formattingButtons = [
    {
      label: "Bold",
      icon: Bold,
      active: editorState?.bold ?? false,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: Italic,
      active: editorState?.italic ?? false,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Underline",
      icon: UnderlineIcon,
      active: editorState?.underline ?? false,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: "Strikethrough",
      icon: Strikethrough,
      active: editorState?.strike ?? false,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-input">
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex flex-wrap items-center gap-1 border-b border-input p-2"
      >
        {formattingButtons.map(
          ({ label, icon: Icon, active, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              aria-pressed={active}
              title={label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={onClick}
              className={`flex size-8 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Icon aria-hidden="true" className="size-4" />
            </button>
          ),
        )}
      </div>

      <div className="relative">
        <EditorContent editor={editor} />

        {editorState?.isEmpty && (
          <p className="pointer-events-none absolute top-4 left-4 text-sm text-muted-foreground">
            {placeholder}
          </p>
        )}
      </div>
    </div>
  );
}