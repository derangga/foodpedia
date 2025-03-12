"use client";

import { gptSessionAtom } from "@/atom/gpt-session";
import { useAtom } from "jotai";
import { Ellipsis } from "lucide-react";
import { useEffect } from "react";

export const SessionGpt = ({ sessions }) => {
  const [gptSession, setGptSession] = useAtom(gptSessionAtom);
  useEffect(() => {
    if (sessions) {
      setGptSession(sessions);
    }
  }, [sessions]);
  return (
    <div className="flex flex-col gap-1">
      {gptSession.map((e, idx) => (
        <div
          key={idx + 1}
          className="flex flex-row justify-between p-2 rounded-xl hover:bg-stone-200 hover:cursor-pointer font-poppins"
        >
          <div>{e.title}</div>
          <Ellipsis />
        </div>
      ))}
    </div>
  );
};
