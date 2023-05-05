"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import { axios } from "~/lib/axios";
import { useAuth } from "~/providers/auth";
import { CreateCheckoutResponse } from "./api/payment/subscribe/route";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return <></>;

  const handleClick = async () => {
    try {
      const { checkoutURL } = await axios.post<any, CreateCheckoutResponse>(
        "/api/payment/subscribe",
        { userId: user.id }
      );
      window.location.href = checkoutURL;
    } catch (err) {
      //
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 border border-gray-900 p-8 rounded-lg">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">Your profile</h2>
        <Button onClick={handleClick}>Subscribe</Button>
      </div>
    </div>
  );
}
