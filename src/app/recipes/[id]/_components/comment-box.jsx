"use client";
import { Textarea, Button } from "@heroui/react";
import { useState } from "react";

export const CommentBox = ({ className }) => {
  const [comment, setComment] = useState("");
  return (
    <form className={`flex flex-col items-end gap-3 ${className || ""}`}>
      <Textarea
        placeholder="Give a warm comment"
        minRows={5}
        onValueChange={setComment}
      />
      <div className="flex gap-4 items-center">
        <div
          className={`font-poppins ${
            comment.length <= 200 ? "text-gray-400" : "text-red-400"
          }`}
        >
          {`${comment.length}`}/200
        </div>
        <Button
          className={`w-fit text-white ${
            comment.length === 0 ? "bg-gray-200" : "bg-black"
          }`}
          radius="full"
        >
          Respond
        </Button>
      </div>
    </form>
  );
};
