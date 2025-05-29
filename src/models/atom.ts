import { atom } from "jotai";
import { GptSession, Message } from "./message";

export const useMessageAtom = atom<Message[]>([]);

export const useLoadingAtom = atom<boolean>(false);

export const useGptSessionAtom = atom<GptSession[]>([]);
