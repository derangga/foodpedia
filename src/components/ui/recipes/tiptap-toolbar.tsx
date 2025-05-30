"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

interface TipTapToolbarProps {
  editor: Editor | null;
}

const TipTapToolbar: React.FC<TipTapToolbarProps> = ({ editor }) => {
  return (
    <div className="bg-gray-50 p-2 border-b border-gray-300 flex gap-2">
      <button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
        }`}
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
        }`}
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
        }`}
      >
        <Heading3 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("bold") ? "bg-gray-200" : ""
        }`}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("italic") ? "bg-gray-200" : ""
        }`}
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("underline") ? "bg-gray-200" : ""
        }`}
      >
        <UnderlineIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor?.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
      >
        <ListOrdered className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TipTapToolbar;
