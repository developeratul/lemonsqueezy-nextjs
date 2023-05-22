"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { axios } from "~/lib/axios";
import { useAuth } from "~/providers/auth";
import { SignUpResponse } from "../api/auth/sign-up/route";

export default function SignUp() {
  const [input, setInput] = React.useState({ email: "", password: "" });
  const { setUser, user } = useAuth();
  const router = useRouter();
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value, name },
  }) => {
    setInput((pre) => ({ ...pre, [name]: value }));
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = input;

      if (!email || !password) return;

      const { user, message } = await axios.post<any, SignUpResponse>("/api/auth/sign-up", {
        email,
        password,
      });

      setUser(user);
      document.cookie = `userId=${user?.id}`;
      router.push("/");
      toast.success(message);
    } catch (err) {
      //
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-lg border border-gray-900">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Sign up</h2>
          <Input
            required
            type="email"
            onChange={handleInputChange}
            name="email"
            placeholder="Enter email"
          />
          <Input
            required
            type="password"
            placeholder="Enter password"
            onChange={handleInputChange}
            name="password"
          />
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
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
