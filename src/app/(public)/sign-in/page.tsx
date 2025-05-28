"use client";

import { Card } from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import CardDescription from "@/components/ui/CardDescription";
import { useForm } from "react-hook-form"
import CardFooter from "@/components/ui/CardFooter";
import CardHeader from "@/components/ui/CardHeader";
import CardTitle from "@/components/ui/CardTitle";
import { SignInButton } from "@/components/ui/SignIn";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import router from "next/router";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});


type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignInPage() {

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  async function onSubmit({ email, password }: LoginFormValues) {
    console.log('Passou: ', email, password);
    const res = await signIn('credentials', { email, password, callbackUrl: '/dashboard' });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      console.log('Credenciais inválidas', res?.error);
}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-3">
        <>
          <CardHeader className="p-y-3">
            <>
              <CardTitle className="text-2xl font-bold text-center">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your email and password to access your NailPro dashboard
              </CardDescription>
            </>
            <SignInButton />
          </CardHeader>

          <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite seu email" {...field} />
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
                      <FormLabel className="font-bold">Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Digite sua senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="flex items-center justify-end">
                <a
                  href=""
                  className="text-sm text-rose-600 hover:text-rose-800"
                >
                  Forgot password
                </a>
              </div>

              <button
                className="w-full bg-rose-500 text-white rounded py-2 hover:bg-rose-600 cursor-pointer"
                type="submit"
              >
                Sign in
              </button>
            </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-rose-600 hover:text-rose-800 font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </>
      </Card>
    </div>
  );
}
