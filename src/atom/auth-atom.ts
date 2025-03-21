import { AuthStatus } from "@/model/auth-status";
import { atom } from "jotai";

export const authAtom = atom<AuthStatus>();
