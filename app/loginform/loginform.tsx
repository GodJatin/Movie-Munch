"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState<string>("");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.match(/^[\w.%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/))
      newErrors.email = "Invalid email format.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (errors[id]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log("Entered Email:", formData.email);
    console.log("Entered Password:", formData.password);
  
    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  
    // Find user with matching credentials
    const validUser = storedUsers.find(
      (user: { email: string; password: string }) =>
        user.email === formData.email && user.password === formData.password
    );
  
    if (validUser) {
      console.log("Login successful");
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      window.location.href = "/home"; // Redirect to home page
    } else {
      console.log("Invalid email or password");
      setErrors({ email: "Invalid email or password." });
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Login to Movie Munch
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Welcome back! Please login to your account.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="abc@gmail.com" type="email" onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </LabelInputContainer>

          {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
