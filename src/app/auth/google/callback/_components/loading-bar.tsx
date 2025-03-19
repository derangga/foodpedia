"use client";
import { Progress } from "@heroui/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const LoadingBar = ({ token }: { token: string }) => {
  useEffect(() => {
    if (!token) return;

    const requestSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const route = response.ok ? "/" : "/auth";
        redirect(route);
      } catch (error) {
        console.error("[ERROR] failed generate session");
        redirect("/auth");
      }
    };
    requestSession();
  }, [token]);

  return (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
      size="sm"
    />
  );
};
