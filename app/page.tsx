"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Sign In</h1>
      <Button
        variant={"outline"}
        onClick={() => signIn("google", { redirectTo: "/protected/schema-visualizer" })}
        size="lg"
        className="flex justify-between mt-2"
      >
        With Google
      </Button>
    </div>
  );
}
