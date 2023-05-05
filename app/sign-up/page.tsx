import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-lg border border-gray-900">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Sign up</h2>
          <Input placeholder="Enter email" />
          <Input placeholder="Enter password" />
          <Button className="w-full">Sign up</Button>
        </div>
      </div>
      <div>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-300 hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
