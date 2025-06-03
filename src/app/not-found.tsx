import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src={"/assets/walking-duck.gif"}
        alt="error-logo"
        height={400}
        width={400}
      />
      <h2 className="text-2xl font-semibold font-mono">404 Page not found</h2>
      <div className="font-mono">{"Looks like you're lost"}</div>
      <Link href={"/"} className="mt-4">
        <Button className="text-white">Go to home</Button>
      </Link>
    </div>
  );
}
