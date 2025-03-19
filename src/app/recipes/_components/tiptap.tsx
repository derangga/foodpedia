"use client";

import { TiptapToolbar } from "./tiptap-toolbar";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export type TipTapProps = {
  content: string;
  onChange: (content: string) => void;
  className?: string;
};
export const TipTap = (props: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write step to cook",
      }),
    ],
    immediatelyRender: false,
    content: props.content,
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose min-h-[24rem] px-4 py-3 pt-4 justify-start border-2 border-gray-200 focus:border-gray-400 hover:border-gray-300 items-start w-full rounded-b-xl outline-none overflow-scroll",
      },
    },
  }) as Editor;

  const style = props.className ? `w-full ${props.className}` : "w-full";
  return (
    <div className={style}>
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
