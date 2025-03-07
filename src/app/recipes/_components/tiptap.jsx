"use client";

import { TiptapToolbar } from "./tiptap-toolbar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export const TipTap = ({ content, onChange, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write step to cook",
      }),
    ],
    immediatelyRender: false,
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose min-h-[25rem] px-4 py-3 pt-4 justify-start border-2 border-gray-200 focus:border-gray-400 hover:border-gray-300 items-start w-full rounded-b-xl outline-none overflow-scroll",
      },
    },
  });

  const style = className ? `w-full ${className}` : "w-full";
  return (
    <div className={style}>
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
