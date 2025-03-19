import {
  Bold,
  CornerUpLeft,
  CornerUpRight,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";

import { Editor } from "@tiptap/react";

export const TiptapToolbar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="px-3 py-2 rounded-t-xl flex justify-between items-start gap-5 w-full flex-wrap border-x-2 border-t-2 border-gray-200">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={
          editor.isActive("bold")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <Bold size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={
          editor.isActive("italic")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <Italic size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={
          editor.isActive("underline")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <Underline size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <Heading2 size={20} />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={
          editor.isActive("bulletList")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <List size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={
          editor.isActive("orderedList")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <ListOrdered size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className={
          editor.isActive("undo")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <CornerUpLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className={
          editor.isActive("redo")
            ? "bg-orange-300 text-white p-1 rounded-lg"
            : "text-orange-300 p-1 hover:bg-orange-300 hover:text-white rounded-lg"
        }
      >
        <CornerUpRight size={20} />
      </button>
    </div>
  );
};
