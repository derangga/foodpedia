"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapToolbar from "./tiptap-toolbar";

interface TipTapProps {
  onChange?: (content: string) => void;
}

const TipTap: React.FC<TipTapProps> = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write step to cook",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none",
      },
    },
  });

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};

export default TipTap;
