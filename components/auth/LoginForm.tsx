"use client";

import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schemas";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { ButtonLoading } from "@/components/ui/buttonLoader";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      // TODO
      signIn("credentials", { ...values, callbackUrl: "/" }).then((data) => {
        form.reset();
        redirect("/");
      });
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <h1 className="text-xl">Login</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <p className="text-center items-center flex h-full">
            Don't have an account?{" "}
          </p>
          <Link
            href="/auth/register"
            className="cursor-pointer hover:underline "
          >
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
