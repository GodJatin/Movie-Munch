"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { TypewriterEffectSignupform } from "./typewriter-effect-signupform";

  
export function SignupFormDemo() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: ""
      });
      
      const router = useRouter();
      const [errors, setErrors] = useState<{ [key: string]: string }>({});    
      const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
    
        if (!formData.firstname) newErrors.firstname = "First name is required.";
        if (!formData.lastname) newErrors.lastname = "Last name is required.";
        if (!formData.email.match(/^[\w.%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/)) newErrors.email = "Invalid email format.";
        if (!formData.contact.match(/^\d{10}$/)) newErrors.contact = "Contact must be 10 digits.";
        if (!formData.password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) newErrors.password = "Password must be at least 8 characters long with 1 uppercase, 1 number, and 1 special character.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    
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
        
        if (!validateForm()) {
          console.log("Form contains errors");
          return;
        }
      
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
        const emailExists = storedUsers.some((user: { email: string }) => user.email === formData.email);
        
        if (emailExists) {
          console.log("Email already registered. Please log in.");
          setErrors({ email: "Email is already registered. Try logging in." });
          return;
        }
      
        const newUser = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          contact: formData.contact,
          password: formData.password, 
        };
      
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
      
        console.log("User registered successfully:", newUser);
        
        router.push("/loginform");
      };
      

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold flex flex-col items-center justify-center font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Movie Munch
      </h2>
        <TypewriterEffectSignupform/>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" onChange={handleChange} />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Durden" type="text" onChange={handleChange} />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="abc@gmail.com" type="email" onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="contact">Contact</Label>
          <Input id="contact" placeholder="1234567890" type="text" onChange={handleChange} />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input id="confirmPassword" placeholder="••••••••" type="password" onChange={handleChange} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
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
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};