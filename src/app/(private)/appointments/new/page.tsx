"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { AlertCircle, ArrowLeft, CalendarIcon, Clock } from "lucide-react"
import Link from "next/link"
import Input from "@/components/ui/Input"
import { Client, Service } from "@prisma/client"
import { useSession } from "next-auth/react"

// Available time slots (in a real app, these would be dynamically generated based on working hours and existing appointments)
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const appointmentSchema = z.object({
  clientId: z.string().min(1, "Please select a client"),
  serviceId: z.string().min(1, "Please select a service"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  notes: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentSchema>

export default function NewAppointmentPage() {
  const { data: session } = useSession();

  const router = useRouter()
  const searchParams = useSearchParams();
  const [ clients, setClients ] = useState<Client[]>([]);
    const [services, setService] = useState<Service[]>([]);


  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)


useEffect(() => {
   const fetchClients = async () => {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data); 
    };

     const fetchServices = async () => {
      const response = await fetch('/api/services');
      const data = await response.json();
      setService(data); 
    };

    fetchClients();
    fetchServices();

}, []);
  console.log('Data: ', services);
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientId: searchParams.get("client") || "",
      serviceId: "",
      date: new Date(),
      time: "",
      price: 0,
      notes: "",
    },
  })

  

  // Update price when service changes
  useEffect(() => {
    const serviceId = form.watch("serviceId")
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId)
      if (service) {
        setSelectedService(service)
        form.setValue("price", Number(service.price))
      }
    }
  }, [form.watch("serviceId"), form])

  async function onSubmit(data: AppointmentFormValues) {
    setIsLoading(true);
    setError(null)

    try {
      console.log("Appointment data:", {
        ...data,
        dateTime: `${format(data.date, "yyyy-MM-dd")}T${data.time}:00`,
      })

      await fetch('/api/appointments', {
        method: 'POST',
        body: JSON.stringify({...data, companyId: session?.user.companyId, userId: session?.user.id}), 
        headers: {"Content-Type": "application/json"},
      });

      router.push("/appointments")  ;

      // Redirect to appointments list
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/appointments" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Agendar novo pedido</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do pedido</CardTitle>
          <CardDescription>Agende um novo compromisso para um cliente.</CardDescription>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} -{" "}
                              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                Number(service.price),
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar   
                            className="bg-gray-50"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-end">
                  {selectedService && (
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Duration: {selectedService.duration} minutes</span>
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escreva qualquer anotação sobre esse agendamento"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                <Link href="/appointments" className="w-full sm:w-auto">
                  <Button variant="outline" type="button" className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? "Agendanto..." : "Agendar atendimento"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
