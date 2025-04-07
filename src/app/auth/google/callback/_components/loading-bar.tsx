"use client";
import { getUserAction } from "@/shared/actions/get-user";
import { storeUserData } from "@/utils/user-storage";
import { Progress } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoadingBar = ({ token }: { token: string }) => {
  const route = useRouter();
  useEffect(() => {
    if (!token) return;

    const requestSession = async () => {
      try {
        const response = await fetch("/api/oauth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await getUserAction();
        if (user) {
          storeUserData(user);
        }
        const path = response.ok ? "/" : "/auth";
        route.replace(path);
      } catch (error) {
        console.error("[ERROR] failed generate session");
        route.replace("/auth");
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
