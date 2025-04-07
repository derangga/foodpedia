import { User } from "@/model/user";
import { getUserData } from "@/utils/user-storage";
import { useEffect, useState } from "react";

export function useUserData() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(getUserData());
    }
  }, []);

  return user;
}
