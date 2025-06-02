"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").or(z.string().length(0)),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  notes: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

export default function UpdateClientPage() {
  const router = useRouter()
  const params = useParams()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingClient, setIsLoadingClient] = useState(true)

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  })

  // Load client data
  useEffect(() => {
    async function loadClient() {
      try {
        const client = await fetch(`/api/clients/${params.id}`).then(res => res.json());

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use mock data for now
        form.reset({
          name: client.name ?? "",
          email: client.email ?? "",
          phone: client.phone ?? "",
          notes: client.notes ?? "",
        })
      } catch (err) {
        setError("Failed to load client data")
      } finally {
        setIsLoadingClient(false)
      }
    }

    loadClient()
  }, [params.id, form])

  async function onSubmit(data: ClientFormValues) {
    setIsLoading(true)
    setError(null)

    try {
        
        // In a real app, this would be an API call
        console.log("Updated client data:", { id: params.id, ...data })
        const clientUpdated = await fetch('/api/clients', {
            body: JSON.stringify({ id: params.id, ...data }),
            method: 'PUT',
            headers: { "Content-Type": "application/json" },

        }).then(res => res.json());
    
        console.log('Atualizado: ', clientUpdated);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Redirect to clients list
      router.push("/clients")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingClient) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando cliente...</span>
          </div>
        </div>
    )
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/clients" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Editar Cliente</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do cliente</CardTitle>
          <CardDescription>Atualize os detalhes do cliente abaixo.</CardDescription>
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
                      <Input placeholder="Digite o nome do cliente" {...field} />
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
                        <Input placeholder="Digite o numero de telefone" {...field} />
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
                        <Input type="email" placeholder="Digite o email do cliente" {...field} />
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
                    <FormLabel>Observações (Opcional)</FormLabel>
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
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    "Atualizar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
