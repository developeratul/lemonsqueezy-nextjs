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

export default function Login() {
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

      const { user, message } = await axios.post<any, SignUpResponse>("/api/auth/login", {
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
          <h2 className="text-2xl">Login</h2>
          <Input
            required
            type="email"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />
          <Input
            required
            type="password"
            placeholder="Enter password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
      <div>
        <p>
          Don&apos;t have an account?{" "}
          <Link className="text-blue-300 hover:underline underline-offset-4" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
