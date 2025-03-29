import { User } from "@/model/user";

export function storeUserData(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserData() {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  const user: User = JSON.parse(userStr);
  return user;
}
