 "use client";

import { Card } from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import CardDescription from "@/components/ui/CardDescription";
import CardFooter from "@/components/ui/CardFooter";
import CardHeader from "@/components/ui/CardHeader";
import { useForm } from "react-hook-form";
import CardTitle from "@/components/ui/CardTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

const createAccountSchema = z.object({
  companyName: z.string(),
  companyEmail: z.string().email(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPassword: z.string(),
});


type RegisterFormValues = z.infer<typeof createAccountSchema>;


export default function Register() {
  const toast = useToast();
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      customerEmail: "",
      customerPassword: "",
      customerName: "",
    }
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if(!response.ok) {
        throw new Error();
      }

      router.push('/sign-in')
      toast.showToast({
        title: "Usuário registrado com sucesso!",
        type: "success"
      })

      setIsLoading(false);
    } catch (err) {
      toast.showToast({
        title: "Erro ao cadastrar usuário!",
        type: "danger"
      })
      setIsLoading(false);
    }
  } 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-3">
        <>
        <CardHeader className="p-y-3">
          <>
          <CardTitle className="text-2xl font-bold text-center">
            Criar conta
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Preencha suas informações para criar sua conta 
          </CardDescription>
          </>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Nome da empresa</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite o nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email da empresa</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite o email da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Seu nome</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
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
                  name="customerPassword"
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
              
              <Button type="submit" variant="default" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    "Criar conta"
                  )}
               </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
          Possui uma conta? {" "}
            <Link href="/sign-in" className="text-rose-600 hover:text-rose-800 font-medium">
              Entrar
            </Link>
          </p>
        </CardFooter>
        </>
      </Card>
    </div>
  );
}
