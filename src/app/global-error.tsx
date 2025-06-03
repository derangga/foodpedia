"use client";

import Image from "next/image";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function GlobalError() {
  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-2xl font-semibold font-mono">
          There is an error occured
        </h2>
        <Link href={"mailto:support@foodpedia.com"}>
          <Button className="text-white">
            <Mail />
            Report Problem
          </Button>
        </Link>

        <Image
          src={"/assets/burning-laptop-duck.gif"}
          alt="error-logo"
          height={400}
          width={400}
        />
      </body>
    </html>
  );
}
