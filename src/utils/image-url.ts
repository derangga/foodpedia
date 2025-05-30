import { env } from "@/lib/environment";

export function imgURL(path: string) {
  return `${env.R2_PUBLIC_URL}/${path}`;
}
