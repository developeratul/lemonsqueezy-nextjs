"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { axios } from "~/lib/axios";

export default function ManageSubscription(props: {
  userId: string;
  isCanceled: boolean;
  currentPeriodEnd?: number;
  updatePaymentMethodURL: string;
}) {
  const { userId, isCanceled, currentPeriodEnd, updatePaymentMethodURL } = props;
  const router = useRouter();

  // If the subscription is cancelled, let the user resume his plan
  if (isCanceled && currentPeriodEnd) {
    const handleResumeSubscription = async () => {
      try {
        const { message } = await axios.post<any, { message: string }>(
          "/api/payment/resume-subscription",
          { userId }
        );
        router.refresh();
        toast.success(message);
      } catch (err) {
        //
      }
    };

    return (
      <div className="flex flex-col justify-between items-center gap-4">
        <p>
          You have cancelled the subscription but you still have access to our service until{" "}
          {new Date(currentPeriodEnd).toDateString()}
        </p>
        <Button className="w-full" onClick={handleResumeSubscription}>
          Resume plan
        </Button>
        <a
          href={updatePaymentMethodURL}
          className="w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full">Update payment method</Button>
        </a>
      </div>
    );
  }

  // If the user is subscribed, let him cancel his plan
  const handleCancelSubscription = async () => {
    try {
      const { message } = await axios.post<any, { message: string }>(
        "/api/payment/cancel-subscription",
        { userId }
      );
      router.refresh();
      toast.success(message);
    } catch (err) {
      //
    }
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <p>You are subscribed to our product. Congratulations</p>
      <Button className="bg-red-300 hover:bg-red-500 w-full" onClick={handleCancelSubscription}>
        Cancel
      </Button>
      <a href={updatePaymentMethodURL} className="w-full" target="_blank" rel="noopener noreferrer">
        <Button className="w-full">Update payment method</Button>
      </a>
    </div>
  );
}
