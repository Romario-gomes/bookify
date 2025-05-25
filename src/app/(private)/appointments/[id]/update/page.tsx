"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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
import { AlertCircle, ArrowLeft, CalendarIcon, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import Input from "@/components/ui/Input"
import { Appointment, Client, Prisma, Service } from "@prisma/client"

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

type AppointmentWithClient = Prisma.AppointmentGetPayload<{
    include: { client: true, user: true, service: true }
  }>;

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

export default function EditAppointmentPage() {
    const router = useRouter()
    const params = useParams()
    const [error, setError] = useState<string | null>(null);
    const [ services, setService ] = useState<Service[]>([]);
    const [ clients, setClients ] = useState<Service[]>([]);
    const [appointment, setAppointment] = useState<AppointmentWithClient>({} as AppointmentWithClient);
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingAppointment, setIsLoadingAppointment] = useState(true)
    const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            clientId: "",
            serviceId: "",
            date: new Date(),
            time: "",
            price: 0,
            notes: "",
        },
    });

    useEffect(() => {
        const detailsAppointment = async() => {
            const response = await fetch(`/api/appointments/${params.id}`);
            const data = await response.json();
            setAppointment(data);
        }
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
        detailsAppointment();
    }, [])
    console.log('Details: ', appointment);
    // Load appointment data
    useEffect(() => {
        async function loadAppointment() {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Use mock data for now
                form.reset({
                    clientId: appointment.clientId,
                    serviceId: appointment.serviceId,
                    date: appointment.date,
                    price: Number(appointment.price),
                    notes: appointment.notes ?? undefined,
                })

                // Set selected service for duration display
                const selected = services.find((s) => s.id === appointment.serviceId)
                if (selected) {
                    setSelectedService(selected)
                }
            } catch (err) {
                setError("Failed to load appointment data")
            } finally {
                setIsLoadingAppointment(false)
            }
        }

        loadAppointment()
    }, [params.id, form]);

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
        setIsLoading(true)
        setError(null)

        try {
            // In a real app, this would be an API call
            console.log("Updated appointment data:", {
                id: params.id,
                ...data,
                dateTime: `${format(data.date, "yyyy-MM-dd")}T${data.time}:00`,
            })

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to appointments list
            router.push("/appointments")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoadingAppointment) {
        return (

            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading appointment...</span>
                </div>
            </div>

        )
    }

    return (
        <>
            <div className="flex items-center mb-6">
                <Link href="/appointments" className="mr-4">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold">Edit Appointment</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>Update the appointment information below.</CardDescription>
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
                                            <FormLabel>Client</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a client" />
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
                                            <FormLabel>Service</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a service" />
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
                                            <FormLabel>Date</FormLabel>
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
                                            <FormLabel>Time</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a time" />
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
                                            <FormLabel>Price (R$)</FormLabel>
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
                                        <FormLabel>Notes (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter any notes about this appointment"
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
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Appointment"
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
