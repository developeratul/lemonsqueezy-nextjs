"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import { axios } from "~/lib/axios";
import { useAuth } from "~/providers/auth";
import { CreateCheckoutResponse } from "./api/payment/subscribe/route";

export default function SubscribeButton() {
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

  return <Button onClick={handleClick}>Subscribe</Button>;
}
