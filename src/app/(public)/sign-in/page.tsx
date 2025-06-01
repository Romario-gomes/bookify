"use client";

import { Card } from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import CardDescription from "@/components/ui/CardDescription";
import { useForm } from "react-hook-form"
import CardFooter from "@/components/ui/CardFooter";
import CardHeader from "@/components/ui/CardHeader";
import CardTitle from "@/components/ui/CardTitle";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import router from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});


type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  async function onSubmit({ email, password }: LoginFormValues) {
    setIsLoading(true);
    console.log('Passou: ', email, password);
    const res = await signIn('credentials', { email, password, callbackUrl: '/dashboard' });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      console.log('Credenciais inválidas', res?.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-3">
        <>
          <CardHeader className="p-y-3">
            <>
              <CardTitle className="text-2xl font-bold text-center text-rose-500">
                Bookify
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Digite seu email e senha para acessar o dashboard
              </CardDescription>
            </>
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
                    Esqueci a senha
                  </a>
                </div>


                <Button type="submit" disabled={isLoading} className="w-full bg-rose-500 text-white rounded py-2 hover:bg-rose-600 cursor-pointer">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Não possui uma conta?{" "}
              <Link
                href="/register"
                className="text-rose-600 hover:text-rose-800 font-medium"
              >
                cadastre-se
              </Link>
            </p>
          </CardFooter>
        </>
      </Card>
    </div>
  );
}
