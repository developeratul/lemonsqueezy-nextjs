"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "./providers/auth";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <></>;

  return (
    <div className="w-full max-w-md bg-white/5 border border-gray-900 p-8 rounded-lg">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">Your profile</h2>
      </div>
    </div>
  );
}
