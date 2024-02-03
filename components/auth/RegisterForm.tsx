"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

// import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";
import AlertWrapper from "../ui/alertWrapper";
import { registerUser } from "@/actions/register";
import { useToast } from "../ui/use-toast";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await registerUser(values).then((data) => {
        if (data.error) {
          toast({ title: data.error, description: "", variant: "destructive" });
          return;
        }
        if (data.success) {
          toast({ title: data.success, description: "" });
          return;
        }
      });
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader className="text-lg">
          <h1>Register</h1>
          {error && <AlertWrapper title={error} type="destructive" />}
          {success && <AlertWrapper title={success} />}
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Name"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="*******"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
