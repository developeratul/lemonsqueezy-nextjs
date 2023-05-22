"use client";
import { Button } from "~/components/ui/button";

// Error components must be Client components
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-4">
      <h2 className="text-lg">Something went wrong!</h2>
      <p className="text-red-300">{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
