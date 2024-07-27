"use client";

import { SignupValues, signUpSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { signUp } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";

/**
 * The SignUpForm component is a form for users to create a new account.
 * It uses React Hook Form and Zod for form validation.
 *
 * @returns {JSX.Element} - The SignUpForm component.
 */
export default function SignUpForm() {
  // State variable to store any error message during form submission.
  const [error, setError] = useState<string>();

  // State variable to track the loading state of form submission.
  const [isPending, startTransition] = useTransition();

  // Initialize the form using React Hook Form and Zod resolver.
  const form = useForm<SignupValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  /**
   * Handles form submission.
   * Clears any existing error message, starts a transition, and calls the signUp action.
   * If an error occurs during signUp, sets the error message.
   *
   * @param {SignupValues} values - The form values.
   */
  async function onSubmit(values: SignupValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) {
        setError(error);
      }
    });
  }

  // Render the form with input fields, error message, and submit button.
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
}
