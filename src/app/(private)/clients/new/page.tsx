"use client"

import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/ToastProvider";

const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").or(z.string().length(0)),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  notes: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

export default function NewClientPage() {
    const router = useRouter();
    const { data, status } = useSession();
    const toast = useToast();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
        name: "",
        email: "",
        phone: "",
        notes: "",
        },
    })
    const user = data?.user;
    console.log("User: ", user);
    async function onSubmit(data: ClientFormValues) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/clients', {
          method: 'POST',
          body: JSON.stringify({...data, companyId: user?.companyId!, userId: user?.id! }),
          headers: { "Content-Type": "application/json" },
        })

        if(!response.ok) {
          throw new Error();

        }
        router.push('/clients')
        toast.showToast({
        title: "Cliente cadastrado com sucesso!",
        type: "success"
      })

      } catch (err) {
        toast.showToast({
          title: "Erro ao cadastrar usuário!",
          type: "danger"
        })
        
      } finally {
        setIsLoading(false);
      }
    }


    return <>
    <div className="flex items-center mb-6">
        <Link href="/clients" className="mr-4 ">
          <Button variant="ghost" className="cursor-pointer" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Novo Cliente</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do cliente</CardTitle>
          <CardDescription>Insira as informações do cliente. Apenas o nome e telefone são obritagórios</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do(a) cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o numero do celular" {...field} />
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
                      <FormLabel>Email (Opcional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Digite o email do(a) cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observação (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite informações relevantes sobre o cliente (Preferências, alergias, etc.)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                <Link href="/clients" className="w-full sm:w-auto">
                  <Button variant="outline" type="button" className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? "Criando..." : "Criar Cliente"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
}